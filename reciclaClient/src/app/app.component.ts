import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { SessionProvider } from '../providers/session';
import { LoginPage } from '../pages/login/login';
import { Platform } from 'ionic-angular/platform/platform';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public sessionProvider: SessionProvider) {

        this.sessionProvider.getSessionToken().then(res => {
            if (res == null) {
                this.rootPage = LoginPage
            } else {
                this.rootPage = TabsPage
            }
        })

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}
