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
import { LoadingController, Loading, NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/api/userProvider';
import { NormalLoginPage } from './normalLogin/normalLogin';
import { EncryptProvider } from '../../providers/encryptProvider';
import { InstagramProvider } from '../../providers/instagramProvider';
import { TypeUser } from '../../models/typeUser';


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
        private userProvider: UserProvider,
        private navCtrl: NavController,
        private encryptProvider: EncryptProvider,
        private instagramProvider: InstagramProvider
    ) {
    }

    doNormalLogin(defaultPage) {
        this.navCtrl.push(NormalLoginPage, {
            defaultPage: defaultPage
        })
    }

    doFbLogin() {
        this.loading = this.loadingCtrl.create({
            content: 'Iniciando sesión...'
        });
        this.loading.present()
        this.loginFb().then(res => {
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



    createNewInstagramUser(instagramUser: any, access_token: string) {
        var user: User
        user = {
            id: -1,
            email: instagramUser.data.id,
            password: null,
            username: instagramUser.data.username,
            fullName: instagramUser.data.full_name,
            profilePicture: instagramUser.data.profile_picture,
            accessToken: access_token,
            recycleItems: [],
            createdDate: new Date(),
            lastPosition: null,
            type: TypeUser.Instagram
        }
        this.userProvider.createUser(user).subscribe(res => {
            this.sessionProvider.updateSession(res.json())
            this.app.getRootNavs()[0].setRoot(TabsPage)
        }, error => {
            this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg)
        })
    }

    loginFb(): Promise<Observable<User>> {

        var user: User

        return this.fb.login(['public_profile', 'email'])
            .then((fbUser: FacebookLoginResponse) =>
                this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {

                    user = {
                        id: -1,
                        email: profile['id'],
                        password: null,
                        username: profile['email'],
                        fullName: profile['name'],
                        profilePicture: profile['picture_large']['data']['url'],
                        accessToken: fbUser.authResponse.accessToken,
                        recycleItems: [],
                        createdDate: new Date(),
                        lastPosition: null,
                        type: TypeUser.Facebook
                    }
                    return this.findAndUpdateOrCreateUser(user).timeout(this.config.defaultTimeoutTime).map((res: any) => {
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

    loginInstagram() {
        this.loading = this.loadingCtrl.create({
            content: 'Iniciando sesión...'
        });
        this.instagramProvider.login().then(tokenRes => {
            this.instagramProvider.getInstagramUserInfo(tokenRes.access_token).subscribe(res => {
                var instagramUser = res.json()
                var user: User

                user = {
                    id: -1,
                    email: instagramUser.data.id,
                    password: null,
                    username: instagramUser.data.username,
                    fullName: instagramUser.data.full_name,
                    profilePicture: instagramUser.data.profile_picture,
                    accessToken: tokenRes.access_token,
                    recycleItems: [],
                    createdDate: new Date(),
                    lastPosition: null,
                    type: TypeUser.Instagram
                }

                this.findAndUpdateOrCreateUser(user).timeout(this.config.defaultTimeoutTime).subscribe((res: any) => {
                    if (res.value != null) {
                        user = res.value
                    } else {
                        user = res
                    }
                    this.sessionProvider.updateSession(user)
                    this.app.getRootNavs()[0].setRoot(TabsPage)
                }, error => {
                    this.loading.dismiss()
                    this.notificationProvider.presentTopToast("Error iniciando sesión.")
                })

            }, error => {
                this.loading.dismiss()
                this.notificationProvider.presentTopToast("Error obteniendo el usuario de Instagram.")
            })
        }).catch(error => {
            this.loading.dismiss()
            this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg)
        })
    }

    loginInDebugMode() {
        var password = this.encryptProvider.encryptPassword(this.config.debugUserPassword)

        var user: User = {
            id: -1,
            email: this.config.debugUserEmail,
            password: password,
            username: Math.random().toString(),
            fullName: 'Debug user',
            profilePicture: 'https://keluro.com/images/Blog/Debug.jpg',
            accessToken: 'DEBUG_MODE',
            recycleItems: [],
            createdDate: new Date(),
            lastPosition: null,
            type: TypeUser.Normal
        }

        return this.findAndUpdateOrCreateUser(user).timeout(this.config.defaultTimeoutTime).map((res: any) => {
            if (res.value != null) {
                user = res.value
            } else {
                user = res
            }
            return user
        }).catch(error => {
            return Observable.throw("[findAndUpdateOrCreateUser()] ->" + error)
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

    findAndUpdateOrCreateUser(loginUser: User): Observable<User> {
        return this.findUserByEmail(loginUser.email).map(
            foundUser => {
                if (foundUser.status == 200) {
                    if (this.usersAreDifferent(loginUser, foundUser.user) == true) {
                        loginUser.id = foundUser.user.id
                        loginUser.lastPosition = foundUser.user.lastPosition
                        loginUser.createdDate = foundUser.user.createdDate
                        return this.userProvider.saveUser(loginUser, foundUser.user.accessToken).subscribe(_ => {
                            return loginUser
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

                    return this.createUserByFBUser(loginUser).map(res => {
                        if (res.status == 201) {
                            return Observable.of(res.user)
                        }
                        else {
                            return Observable.of(null);
                        }
                    }).catch(error => {
                        return Observable.throw("[findAndUpdateOrCreateUser] -> " + error)
                    })
                }
                else {
                    return Observable.of(null);
                }
            });
    }

    usersAreDifferent(fbUser: User, foundUser: User): boolean {
        var out = false
        if (fbUser.email != foundUser.email || fbUser.username != foundUser.username ||
            fbUser.fullName != foundUser.fullName || fbUser.profilePicture != foundUser.profilePicture ||
            fbUser.accessToken != foundUser.accessToken ||
            (fbUser.password != foundUser.password) && fbUser.password != '' && fbUser.password != null) {
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
