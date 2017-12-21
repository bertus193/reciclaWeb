import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
//import { AboutPage } from '../about/about';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    FB_APP_ID: number = 138106000230935;


    constructor(public navCtrl: NavController, public fb: Facebook) {
        this.fb.browserInit(this.FB_APP_ID, "v2.8");
    }

    doFbLogin(): void {

        this.fb.login(['public_profile', 'email'])
            .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
            .catch(e => console.log('Error logging into Facebook', e));

    }
}
