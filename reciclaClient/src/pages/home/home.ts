import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { SessionProvider } from '../../providers/session';
import { LoginPage } from '../login/login';
import { User } from '../../models/user';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    sessionToken: any
    user: User

    constructor(
        public navCtrl: NavController,
        public sessionProvider: SessionProvider,
        public app: App
    ) {
        sessionProvider.getSessionToken().then(res => {
            this.sessionToken = res
        })
        this.user = sessionProvider.getUser()
    }

    logout() {
        this.sessionProvider.logout()
        this.app.getRootNavs()[0].setRoot(LoginPage)
    }




}
