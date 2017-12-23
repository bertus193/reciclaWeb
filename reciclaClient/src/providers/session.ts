import { Injectable } from '@angular/core';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';

import { Platform } from 'ionic-angular';

@Injectable()
export class SessionProvider {
    private userData: any
    private sessionToken: any

    constructor(public platform: Platform, public storage: Storage, public fb: Facebook) {

    }

    public getSessionToken(): Promise<string> {
        return this.storage.get('authToken');
    }

    public setSessionToken(token: string) {
        this.storage.set('authToken', token);
    }

    public getUserData(): any {
        return this.userData
    }

    doFbLogin(): Promise<string | void> {
        return this.fb.login(['public_profile', 'email'])
            .then((res: FacebookLoginResponse) =>
                this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
                    this.userData = { email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'] }
                    this.setSessionToken(res.authResponse.accessToken)
                    this.getSessionToken().then(res => {
                        this.sessionToken = res
                    })
                    return res.authResponse.accessToken
                })).catch(e => {
                    console.log('Error logging into Facebook', e)
                    if (e == "cordova_not_available") {
                        this.setSessionToken('DEBUG_MODE')
                        return 'DEBUG_MODE'
                    } else {
                        return null
                    }
                });
    }

    logout() {
        this.setSessionToken(null)
    }
}
