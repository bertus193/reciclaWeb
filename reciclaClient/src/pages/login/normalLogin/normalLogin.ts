import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
    selector: 'page-normalLogin',
    templateUrl: 'normalLogin.html'
})
export class NormalLoginPage {

    defaultPage: string = 'login'

    email: string = ''
    password: string = ''

    constructor(
        private navParams: NavParams
    ) {
        this.defaultPage = this.navParams.get("defaultPage");
    }

    ionViewDidLoad() {
    }

    public setDefaultPage(defaultPage: string) { //EventEmitter
        this.defaultPage = defaultPage
    }

    public loginButton() {

    }
}
