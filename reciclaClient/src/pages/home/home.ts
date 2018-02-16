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
        sessionProvider.getSession().then(res => {
            this.user = res
            console.log(this.user)
        })

    }

    logout() {
        this.sessionProvider.destroySession()
        this.app.getRootNavs()[0].setRoot(LoginPage)
    }




}
