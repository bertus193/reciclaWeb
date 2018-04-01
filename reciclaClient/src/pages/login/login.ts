import { Component, Inject } from '@angular/core'
import { SessionProvider } from '../../providers/session'
import { NotificationProvider } from '../../providers/notifications';
import { TabsPage } from '../tabs/tabs'
import { App } from 'ionic-angular/components/app/app'

import { User } from '../../models/user'
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map'
import { APP_CONFIG_TOKEN, ApplicationConfig } from '../../app/app-config';
import { LoadingController, Loading } from 'ionic-angular';
import { UserProvider } from '../../providers/api/userProvider';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    loading: Loading;

    constructor(
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        private sessionProvider: SessionProvider,
        private app: App,
        private fb: Facebook,
        private loadingCtrl: LoadingController,
        private notificationProvider: NotificationProvider,
        private userProvider: UserProvider
    ) {
    }

    doFbLogin() {
        this.loading = this.loadingCtrl.create({
            content: 'Iniciando sesión...'
        });
        this.loading.present()
        this.login().then(res => {
            res.subscribe(user => {
                this.loading.dismiss()
                if (user != null) {
                    this.sessionProvider.updateSession(user)
                    this.app.getRootNavs()[0].setRoot(TabsPage)
                }
            }, error => {
                this.loading.dismiss()
                this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg);
            })
        }).catch(error => {
            this.loading.dismiss()
            this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg);
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
                        accessToken: fbUser.authResponse.accessToken,
                        recycleItems: [],
                        createdDate: null,
                        lastPosition: null
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
                    return null
                }).catch(error => {
                    return Observable.throw("[login()] ->" + error)
                });
    }

    loginInDebugMode() {
        var user: User = {
            id: -1,
            email: 'debug@debug.com',
            name: 'Debug',
            fullName: 'Debug user',
            profilePicture: 'https://keluro.com/images/Blog/Debug.jpg',
            accessToken: 'DEBUG_MODE',
            recycleItems: [],
            createdDate: new Date(),
            lastPosition: null
        }

        return this.findOrCreateUser(user).map((res: any) => {
            if (res.value != null) {
                user = res.value
            } else {
                user = res
            }
            return user
        }).catch(error => {
            return Observable.throw("[findOrCreateUser()] ->" + error)
        })
    }

    doFbLoginInDebugMode() {
        if (this.config.DEBUG_MODE) {
            this.loading = this.loadingCtrl.create({
                content: 'Iniciando sesión...'
            });
            this.loading.present()
            this.loginInDebugMode().subscribe(user => {
                this.loading.dismiss()
                if (user != null) {
                    this.sessionProvider.updateSession(user)
                    this.app.getRootNavs()[0].setRoot(TabsPage)
                }
            }, error => {
                this.loading.dismiss()
                this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg);
            })
        }
    }

    findOrCreateUser(fbUser: User): Observable<User> {
        return this.findUserByEmail(fbUser.email).map(
            foundUser => {
                if (foundUser.status == 200) {
                    if (this.usersAreDifferent(fbUser, foundUser.user) == true) {
                        var postToken = foundUser.user.accessToken
                        foundUser.user.email = fbUser.email
                        foundUser.user.name = fbUser.name
                        foundUser.user.fullName = fbUser.fullName
                        foundUser.user.profilePicture = fbUser.profilePicture
                        foundUser.user.accessToken = fbUser.accessToken
                        return this.userProvider.saveUser(foundUser.user, postToken).subscribe(res => {
                            return foundUser.user
                        }, error => {
                            this.notificationProvider.presentTopToast("Error guardando el usuario.")
                        })
                    }
                    else {
                        return foundUser.user
                    }
                } else {
                    return null
                }
            }).catch(err => {
                if (err.status === 404) {

                    return this.createUserByFBUser(fbUser).map(res => {
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

    usersAreDifferent(fbUser: User, foundUser: User): boolean {
        var out = false
        if (fbUser.email != foundUser.email || fbUser.name != foundUser.name ||
            fbUser.fullName != foundUser.fullName || fbUser.profilePicture != foundUser.profilePicture ||
            fbUser.accessToken != foundUser.accessToken) {
            out = true
        }
        return out
    }

    findUserByEmail(email: string): Observable<{ user: User, status: number }> {
        var user: User
        var status: number

        return this.userProvider.findUserByEmail(email).map(res => {
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
        return this.userProvider.createUser(user).map(res => {
            status = res.status

            if (status === 201) {
                user = res.json()
            }
            return { user, status }
        })
    }
}
