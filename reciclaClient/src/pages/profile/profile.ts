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
    user: User
    profileSegment: string

    constructor(
        private sessionProvider: SessionProvider,
        private app: App
    ) {
        sessionProvider.getSession().then(res => {
            this.user = res
            if (this.user.profilePicture == null) {
                this.user.profilePicture = "assets/imgs/quieroReciclar.png"
            }
        })
        this.profileSegment = "profile"
    }

    goToLogout() {
        this.sessionProvider.destroySession()
        this.app.getRootNavs()[0].setRoot(LoginPage)
    }

    goEditProfile() {

    }

}
