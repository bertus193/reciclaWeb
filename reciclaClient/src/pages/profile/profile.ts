import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { SessionProvider } from '../../providers/session';
import { LoginPage } from '../login/login';
import { User } from '../../models/user';
import { myRecycledItemsPage } from './profile_recycledItems/myRecycledItems';

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {
    sessionToken: any
    user: User

    constructor(
        private sessionProvider: SessionProvider,
        private navCtrl: NavController,
        private app: App
    ) {
        sessionProvider.getSession().then(res => {
            this.user = res
        })
    }

    goToLogout() {
        this.sessionProvider.destroySession()
        this.app.getRootNavs()[0].setRoot(LoginPage)
    }

    goToMyRecycledItems() {
        this.navCtrl.push(myRecycledItemsPage)
    }

}
