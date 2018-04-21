import { Component, ViewChild } from '@angular/core';
import { App, NavController, Content, NavParams, Events } from 'ionic-angular';
import { SessionProvider } from '../../providers/session';
import { LoginPage } from '../login/login';
import { User } from '../../models/user';
import { ProfileEditPage } from './profile_edit/profileEdit';

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {
    user: User
    profileSegment: string

    @ViewChild(Content) content: Content

    constructor(
        private sessionProvider: SessionProvider,
        private app: App,
        private navCtrl: NavController,
        private navParams: NavParams,
        private events: Events
    ) {
        sessionProvider.getSession().then(res => {
            this.user = res
            if (this.user.profilePicture == null) {
                this.user.profilePicture = "assets/imgs/quieroReciclar.png"
            }
        })
        this.profileSegment = this.navParams.get("profileSegment")

        this.events.subscribe('change-tab', (tabName, profileSegment) => {
            this.profileSegment = profileSegment;
        });
    }

    goToLogout() {
        this.sessionProvider.destroySession()
        this.app.getRootNavs()[0].setRoot(LoginPage)
    }

    goEditProfile() {
        this.navCtrl.push(ProfileEditPage, {
            user: this.user
        })
    }

    ionSelected() {
        this.content.scrollToTop()
    }

}
