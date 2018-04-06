import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { SessionProvider } from '../providers/session';
import { LoginPage } from '../pages/login/login';
import { Platform } from 'ionic-angular/platform/platform';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private sessionProvider: SessionProvider,
        private keyboard: Keyboard
    ) {

        this.sessionProvider.getSession().then(res => {
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

            this.keyboard.onKeyboardShow().subscribe(() => {
                document.body.classList.add('keyboard-is-open');
            });
            this.keyboard.onKeyboardHide().subscribe(() => {
                document.body.classList.remove('keyboard-is-open');
            });
        });
    }
}
