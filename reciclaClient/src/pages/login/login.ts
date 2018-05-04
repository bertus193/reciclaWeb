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

    loginFb(): Promise<Observable<User>> {

        return this.fb.login(['public_profile', 'email'])
            .then((fbUser: FacebookLoginResponse) =>
                this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {

                    var user: User = new User()

                    //user.email = profile['email']
                    user.username = profile['id']
                    user.fullName = profile['name']
                    user.profilePicture = profile['picture_large']['data']['url']
                    user.accessToken = fbUser.authResponse.accessToken
                    user.type = TypeUser.Facebook

                    return this.findOrCreateUser(user).timeout(this.config.defaultTimeoutTime).map((res: any) => {
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

                var user: User = new User()

                //user.email = instagramUser.data.username
                user.username = instagramUser.data.id
                user.fullName = instagramUser.data.full_name
                user.profilePicture = instagramUser.data.profile_picture
                user.accessToken = tokenRes.access_token
                user.type = TypeUser.Instagram

                this.findOrCreateUser(user).timeout(this.config.defaultTimeoutTime).subscribe((res: any) => {
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

        var user: User = new User()

        user.email = this.config.debugUserEmail
        user.password = password
        user.username = this.config.debugUserEmail
        user.fullName = 'Debug user'
        user.accessToken = 'DEBUG_MODE'
        user.profilePicture = 'https://reciclaweb.000webhostapp.com/uploads/avatars/Debug.jpg'
        user.type = TypeUser.Normal

        return this.findOrCreateUser(user).timeout(this.config.defaultTimeoutTime).map((res: any) => {
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

    findOrCreateUser(loginUser: User): Observable<User> {
        return this.findLoginUserByUsername(loginUser.username, loginUser.accessToken, loginUser.type).map(
            res => {
                if (res.status == 200) {
                    return res.user
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


    findLoginUserByUsername(username: string, accessToken: string, userType: string): Observable<{ user: User, status: number }> {
        var user: User
        var status: number

        return this.userProvider.findUserByUsername(username, accessToken, userType).map(res => {
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
