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
        private navCtrl: NavController,
        private sessionProvider: SessionProvider,
        private app: App
    ) {
        sessionProvider.getSession().then(res => {
            this.user = res
        })

    }

    logout() {
        this.sessionProvider.destroySession()
        this.app.getRootNavs()[0].setRoot(LoginPage)
    }




}
