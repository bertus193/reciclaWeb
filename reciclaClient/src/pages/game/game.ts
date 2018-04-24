import { Component, ViewChild } from '@angular/core';
import { Content, AlertController, Loading, LoadingController, Events } from 'ionic-angular';
import { QuestionProvider } from '../../providers/api/questionProvider';
import { Question } from '../../models/question';
import { User } from '../../models/user';
import { SessionProvider } from '../../providers/session';
import { NotificationProvider } from '../../providers/notifications';
import { Reply } from '../../models/reply';
import { UserQuestionProvider } from '../../providers/api/userQuestionProvider';
import { LastQuestionDone } from '../../models/lastQuestionDone';
import { isNumber } from 'ionic-angular/util/util';

@Component({
    selector: 'page-game',
    templateUrl: 'game.html'
})
export class GamePage {

    private question: Question
    private user: User

    private showLoadingMsg: boolean
    private oneDayLeftAlready: boolean
    private incorrectSurvey: boolean
    private noQuestionFound: boolean

    private hoursLeft: number

    private loading: Loading

    private lastQuestionDone: LastQuestionDone
    private lastQuestionDoneReply: Reply

    @ViewChild(Content) content: Content

    constructor(
        private questionProvider: QuestionProvider,
        private sessionProvider: SessionProvider,
        private notificationProvider: NotificationProvider,
        private alertCtrl: AlertController,
        private userQuestionProvider: UserQuestionProvider,
        private loadingCtrl: LoadingController,
        private events: Events
    ) {
        this.sessionProvider.getSession().then((user: User) => {
            this.user = user

            this.getQuestion().then((res: boolean) => {
                this.showLoadingMsg = false
            });
        }, err => {
            this.notificationProvider.presentTopToast('Error obteniendo los datos necesarios.')
        });
    }

    private getQuestion() {
        this.question = null
        this.showLoadingMsg = true
        this.oneDayLeftAlready = false
        this.incorrectSurvey = false
        this.lastQuestionDone = null
        this.noQuestionFound = false
        this.hoursLeft = 0

        var status: number

        return new Promise(resolve => {
            this.questionProvider.getRandomQuestion(this.user.id, this.user.accessToken).subscribe(res => {
                status = res.status
                if (status === 200) {
                    if (res.json().replies.length == 4) {
                        this.question = res.json()
                        this.question.replies = this.shuffleReplies(this.question)
                        resolve(true)
                    }
                    else { // incorrect survey
                        this.incorrectSurvey = true
                        resolve(false)
                    }
                } else if (status === 206) { //Partial_Content
                    this.lastQuestionDone = res.json()
                    if (this.lastQuestionDone.question != null) {
                        if (isNumber(this.lastQuestionDone.question.correctReply)) {
                            this.lastQuestionDoneReply = this.lastQuestionDone.userReply
                        }
                        else {
                            this.lastQuestionDoneReply = this.lastQuestionDone.question.correctReply
                        }
                    }


                    this.hoursLeft = 24 - this.lastQuestionDone.hours
                    this.oneDayLeftAlready = true
                    resolve(true)
                } else {
                    resolve(false)
                }
            }, error => {
                if (error.status == 404) { // no question found
                    this.noQuestionFound = true
                    resolve(true)
                }
                else {
                    resolve(false)
                }

            })
        })
    }

    shuffleReplies(question: Question): Reply[] {

        var arrayReplies: any[] = question.replies
        arrayReplies.push(question.correctReply)
        arrayReplies = arrayReplies.filter(function (item) { return (!parseInt(item)) })

        var currentIndex = arrayReplies.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = arrayReplies[currentIndex];
            arrayReplies[currentIndex] = arrayReplies[randomIndex];
            arrayReplies[randomIndex] = temporaryValue;
        }

        return arrayReplies
    }

    doRefresh(refresher: any) {
        this.getQuestion().then((res: boolean) => {
            this.showLoadingMsg = false
            refresher.complete();
        });
    }

    ionSelected() {
        this.content.scrollToTop()
    }

    saveUserReply(replyPicked: number) {
        let prompt = this.alertCtrl.create({
            title: 'Elegir respuesta',
            message: "Al elegir una respuesta no podrás volver atrás.",
            buttons: [
                {
                    text: 'Cancelar',
                    handler: data => {
                        return null
                    }
                },
                {
                    text: 'Aceptar',
                    handler: data => {
                        this.loading = this.loadingCtrl.create({
                            content: 'Cargando...',
                            enableBackdropDismiss: true
                        });
                        this.loading.present()

                        this.userQuestionProvider.saveUserReply(this.user.id, this.question.id, this.question.replies[replyPicked].id, this.user.accessToken).subscribe(res => {
                            this.lastQuestionDoneReply = res.json()
                            if (this.lastQuestionDoneReply.id == this.question.replies[replyPicked].id) {
                                this.user.gamePoints = this.user.gamePoints + this.question.questionValue
                                this.sessionProvider.updateSession(this.user)
                                this.events.publish('update-user', this.user)
                            }

                            this.loading.dismiss()
                            this.getQuestion().then((res: boolean) => {
                                this.showLoadingMsg = false
                            });
                        }, error => {
                            this.loading.dismiss()
                            if (error.status == 404) {
                                this.notificationProvider.presentTopToast("Parece que ha habido un error, prueba más tarde")
                            }
                            else {
                                this.notificationProvider.presentTopToast("La pregunta parece tener errores, prueba más tarde")
                            }
                        })
                    }
                }
            ]
        });
        prompt.present()
    }
}
