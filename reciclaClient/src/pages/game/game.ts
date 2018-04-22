import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { QuestionProvider } from '../../providers/api/questionProvider';
import { Question } from '../../models/question';
import { User } from '../../models/user';
import { SessionProvider } from '../../providers/session';
import { NotificationProvider } from '../../providers/notifications';
import { isTrueProperty } from 'ionic-angular/util/util';
import { Reply } from '../../models/reply';

@Component({
    selector: 'page-game',
    templateUrl: 'game.html'
})
export class GamePage {

    private question: Question
    private user: User

    private showLoadingMsg: boolean = true
    private oneDayLeftAlready: boolean = false
    private incorrectSurvey: boolean = false

    private hoursLeft: number = 0

    @ViewChild(Content) content: Content

    constructor(
        private questionProvider: QuestionProvider,
        private sessionProvider: SessionProvider,
        private notificationProvider: NotificationProvider
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
                    this.hoursLeft = 24 - res.json()
                    this.oneDayLeftAlready = true
                    resolve(isTrueProperty)
                } else {
                    resolve(false)
                }
            }, error => {
                if (error.status == 404) { // no question found
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
            refresher.complete();
        });
    }

    ionSelected() {
        this.content.scrollToTop()
    }
}
