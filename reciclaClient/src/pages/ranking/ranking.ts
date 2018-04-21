import { Component, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { Content } from 'ionic-angular';
import { UserProvider } from '../../providers/api/userProvider';

@Component({
    selector: 'page-ranking',
    templateUrl: 'ranking.html'
})
export class RankingPage {

    private users: User[] = []

    private showLoadingMsg: boolean = true

    @ViewChild(Content) content: Content

    constructor(
        private usersProvider: UserProvider
    ) {
        this.getTopRankedUsers().then((res: boolean) => {
            this.showLoadingMsg = false
        });

    }

    private getTopRankedUsers() {
        var status: number

        return new Promise(resolve => {
            this.usersProvider.getTopRankedUsers().subscribe(res => {
                status = res.status
                if (status === 200) {
                    this.users = res.json()
                    console.log(this.users)
                    resolve(true)
                } else {
                    resolve(false)
                }
            }, error => {
                if (error.status == 404) { // no users found
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
