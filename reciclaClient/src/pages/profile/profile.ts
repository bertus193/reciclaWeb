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
        })
        this.profileSegment = this.navParams.get("profileSegment")

        this.events.subscribe('change-tab', (tabName, profileSegment) => {
            if (this.profileSegment == null) {
                this.profileSegment = profileSegment;
            }
            else if (this.profileSegment != 'history') {
                this.profileSegment = profileSegment;
            }
            else {
                if (this.navCtrl.getActive().name == 'recycleItemInfoPage') {
                    this.navCtrl.pop()
                }
            }
        });

        this.events.subscribe('update-user', (user) => {
            this.user = user;
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
