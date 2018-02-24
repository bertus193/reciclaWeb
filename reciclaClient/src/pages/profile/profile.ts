import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { SessionProvider } from '../../providers/session';
import { LoginPage } from '../login/login';
import { User } from '../../models/user';

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {
    sessionToken: any
    user: User

    constructor(
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
