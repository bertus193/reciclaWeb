import { Injectable, Inject } from '@angular/core';

import { Instagram } from "ng2-cordova-oauth/core";
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { Http } from '@angular/http';
import { APP_CONFIG_TOKEN, ApplicationConfig } from '../app/app-config';

@Injectable()
export class InstagramProvider {

    constructor(
        private http: Http,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig
    ) { }

    private oauth: OauthCordova = new OauthCordova();

    private instagramProvider: Instagram = new Instagram({
        clientId: this.config.instagramAPIKey,      // Register you client id from https://www.instagram.com/developer/
        redirectUri: 'http://localhost',  // Let is be localhost for Mobile Apps
        responseType: 'token',   // Use token only 
        appScope: ['basic']
    })

    public login(): Promise<any> {
        return this.oauth.logInVia(this.instagramProvider)
    }

    public getInstagramUserInfo(access_token: string) {
        //GET USER PHOTOS
        return this.http.get('https://api.instagram.com/v1/users/self/?access_token=' + access_token + '&count=5');
    }

}