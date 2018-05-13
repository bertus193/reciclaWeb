import { Component, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { Content, Events } from 'ionic-angular';
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
        private usersProvider: UserProvider,
        private events: Events
    ) {
        this.getTopRankedUsers().then((res: boolean) => {
            this.showLoadingMsg = false
        });

        this.events.subscribe('update-user', (user) => {
            if (user.id != null) {
                var index = this.users.findIndex(u => u.id == user.id)
                this.users[index].points = user.points
            }
        });

    }

    private getTopRankedUsers() {
        var status: number

        return new Promise(resolve => {
            this.usersProvider.getTopRankedUsers().subscribe(res => {
                status = res.status
                if (status === 200) {
                    this.users = res.json()
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
