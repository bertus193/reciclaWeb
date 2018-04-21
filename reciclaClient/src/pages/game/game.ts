import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { QuestionProvider } from '../../providers/api/questionProvider';
import { Question } from '../../models/question';

@Component({
    selector: 'page-game',
    templateUrl: 'game.html'
})
export class GamePage {

    private question: Question

    private showLoadingMsg: boolean = true

    @ViewChild(Content) content: Content

    constructor(
        private questionProvider: QuestionProvider
    ) {
        this.getTopRankedUsers().then((res: boolean) => {
            this.showLoadingMsg = false
        });

    }

    private getTopRankedUsers() {
        var status: number

        return new Promise(resolve => {
            this.questionProvider.getRandomQuestion().subscribe(res => {
                status = res.status
                if (status === 200) {
                    this.question = res.json()
                    resolve(true)
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
        this.getTopRankedUsers().then((res: boolean) => {
            refresher.complete();
        });
    }

    ionSelected() {
        this.content.scrollToTop()
    }
}
