import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { SessionProvider } from '../../providers/session';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    userData: any
    sessionToken: any

    constructor(public navCtrl: NavController, public fb: Facebook, public sessionProvider: SessionProvider) {
        this.sessionProvider.getSessionToken().then(res => {
            this.sessionToken = res
        })
    }

    doFbLogin(): void {

        this.fb.login(['public_profile', 'email'])
            .then((res: FacebookLoginResponse) =>
                this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
                    this.userData = { email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'] }
                    this.sessionProvider.setSessionToken(res.authResponse.accessToken)
                    this.sessionProvider.getSessionToken().then(res => {
                        this.sessionToken = res
                    })
                })).catch(e => console.log('Error logging into Facebook', e));

    }


}
