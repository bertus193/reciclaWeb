import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionProvider } from '../../providers/session';
import { TabsPage } from '../tabs/tabs';
import { App } from 'ionic-angular/components/app/app';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public sessionProvider: SessionProvider, public app: App) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    doFbLogin() {
        this.sessionProvider.doFbLogin().then(res => {
            console.log("OUT:" + res)
            if (res != null) {
                this.app.getRootNavs()[0].setRoot(TabsPage)
            }
        })

    }

}
