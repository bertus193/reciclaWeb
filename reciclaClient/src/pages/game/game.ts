import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { QuestionProvider } from '../../providers/api/questionProvider';
import { Question } from '../../models/question';
import { User } from '../../models/user';
import { SessionProvider } from '../../providers/session';
import { NotificationProvider } from '../../providers/notifications';
import { isTrueProperty } from 'ionic-angular/util/util';

@Component({
    selector: 'page-game',
    templateUrl: 'game.html'
})
export class GamePage {

    private question: Question
    private user: User

    private showLoadingMsg: boolean = true
    private oneDayLeftAlready: boolean = false
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
                    this.question = res.json()
                    resolve(true)
                } else if (status === 206) { //Partial_Content
                    this.hoursLeft = 24 - res.json()
                    this.oneDayLeftAlready = true
                    resolve(isTrueProperty)
                } else {
                    resolve(false)
                }
            }, error => {
                console.log(error)
                if (error.status == 404) { // no question found
                    resolve(true)
                }
                else {
                    resolve(false)
                }

            })
        })
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
