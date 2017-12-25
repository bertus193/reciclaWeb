import { Component, Inject } from '@angular/core'
import { IonicPage } from 'ionic-angular'
import { SessionProvider } from '../../providers/session'
import { TabsPage } from '../tabs/tabs'
import { App } from 'ionic-angular/components/app/app'

import { Http, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { Headers } from '@angular/http'
import { User } from '../../models/user'
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import 'rxjs/add/operator/map'
import { APP_CONFIG_TOKEN, ApplicationConfig } from '../../app/app-config';

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

    constructor(
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        private sessionProvider: SessionProvider,
        private app: App,
        private http: Http,
        private fb: Facebook
    ) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    doFbLogin() {
        this.login().then(res => {
            res.subscribe(user => {
                if (user != null) {
                    this.sessionProvider.setSessionToken(user.accessToken)
                    this.sessionProvider.setUser(user)
                    this.app.getRootNavs()[0].setRoot(TabsPage)
                }
            })
        })

    }

    login(): Promise<Observable<User>> {
        var user: User

        return this.fb.login(['public_profile', 'email'])
            .then((fbUser: FacebookLoginResponse) =>
                this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {

                    user = {
                        id: -1,
                        email: profile['email'],
                        name: profile['first_name'],
                        fullName: profile['name'],
                        profilePicture: profile['picture_large']['data']['url'],
                        accessToken: fbUser.authResponse.accessToken
                    }
                    return this.findOrCreateUser(user).map((res: any) => {
                        if (res.value != null) {
                            user = res.value
                        } else {
                            user = res
                        }
                        return user
                    }).catch(error => {
                        return Observable.throw("[login()] ->" + error)
                    })
                })).catch(e => {

                    console.log('Error logging into Facebook', e)
                    if (this.config.DEBUG_MODE) {

                        var user: User = {
                            id: -1,
                            email: 'debug@debug.com',
                            name: 'Debug',
                            fullName: 'Debug user',
                            profilePicture: 'https://keluro.com/images/Blog/Debug.jpg',
                            accessToken: 'DEBUG_MODE'
                        }

                        return this.findOrCreateUser(user).map((res: any) => {
                            if (res.value != null) {
                                user = res.value
                            } else {
                                user = res
                            }
                            return user
                        }).catch(error => {
                            return Observable.throw("[login()] ->" + error)
                        })


                    } else {
                        return null
                    }
                });
    }

    findOrCreateUser(user: User): Observable<User> {
        return this.findUserByEmail(user.email).map(
            foundUser => {
                if (foundUser.status == 200) {
                    return foundUser.user
                } else {
                    return null
                }
            }).catch(err => {
                if (err.status === 404) {

                    return this.createUserByFBUser(user).map(res => {
                        if (res.status == 201) {
                            return Observable.of(res.user)
                        }
                        else {
                            return Observable.of(null);
                        }
                    }).catch(error => {
                        return Observable.throw("[findOrCreateUser] -> " + error)
                    })
                }
                else {
                    return Observable.of(null);
                }
            });
    }

    findUserByEmail(email: string): Observable<{ user: User, status: number }> {
        var user: User
        var status: number

        return this.http.get(this.config.apiEndpoint + "/users?email=" + email).map(res => {
            status = res.status

            if (status === 200) {
                user = res.json();
            }
            return { user, status }
        }).catch(error => {
            return Observable.throw(error);
        });

    }

    createUserByFBUser(user: User): Observable<{ user: User, status: number }> {
        var user: User
        var status: number
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        return this.http.post(this.config.apiEndpoint + "/users", JSON.stringify(user), options).map(res => {
            status = res.status

            if (status === 201) {
                user = res.json()
            }
            return { user, status }
        })
    }

}
