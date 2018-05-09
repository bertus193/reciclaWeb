import { Component, Inject } from '@angular/core'
import { SessionProvider } from '../../providers/session'
import { NotificationProvider } from '../../providers/notifications';
import { TabsPage } from '../tabs/tabs'
import { App } from 'ionic-angular/components/app/app'

import { User } from '../../models/user'
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

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
        this.loginFb().then().then((user: User) => {
            this.loading.dismiss()
            this.sessionProvider.updateSession(user)
            this.app.getRootNavs()[0].setRoot(TabsPage)
        }, error => {
            this.loading.dismiss()
            this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg);
        })
    }

    loginFb() {
        return new Promise((resolve, reject) => {
            return this.fb.login(['public_profile', 'email']).then((fbUser: FacebookLoginResponse) =>
                this.fb.api('me?fields=id,email,name,picture.width(720).height(720).as(picture_large)', []).then(profile => {

                    var user: User = new User()

                    //user.email = profile['email']
                    user.username = profile['id']
                    user.fullName = profile['name']
                    user.profilePicture = profile['picture_large']['data']['url']
                    user.accessToken = fbUser.authResponse.accessToken
                    user.type = TypeUser.Facebook

                    return this.findOrCreateUser(user).then((res: User) => {
                        user = res
                        resolve(user)
                    }, error => {
                        reject(error)
                    })
                }, error => {
                    reject(error)
                })
            ).catch(error => {
                reject(error)
            }).catch(error => {
                reject(error)
            });
        })
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

                this.findOrCreateUser(user).then((res: User) => {
                    this.sessionProvider.updateSession(res)
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

        return new Promise((resolve, reject) => {
            this.findOrCreateUser(user).then((res: any) => {
                if (res.value != null) {
                    user = res.value
                } else {
                    user = res
                }
                resolve(user)
            }, error => {
                reject(user)
            })
        })


    }

    doFbLoginInDebugMode() {
        if (this.config.DEBUG_MODE) {
            this.loading = this.loadingCtrl.create({
                content: 'Iniciando sesión...'
            });
            this.loading.present()
            this.loginInDebugMode().then((user: User) => {
                this.loading.dismiss()
                if (user != null) {
                    this.sessionProvider.updateSession(user)
                    this.app.getRootNavs()[0].setRoot(TabsPage)
                }
            }, (rejectUser: User) => {
                this.userProvider.login(rejectUser).subscribe(res => {
                    this.loading.dismiss()
                    this.sessionProvider.updateSession(res.json())
                    this.app.getRootNavs()[0].setRoot(TabsPage)
                }, error => {
                    this.loading.dismiss()
                    this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg);
                })
            })
        }
    }

    findOrCreateUser(loginUser: User) {
        return new Promise((resolve, reject) => {
            this.findLoginUserByUsername(loginUser.username, loginUser.accessToken, loginUser.type).then(res => {
                resolve(res)
            }, err => {
                if (err.status === 404) {
                    return this.createUserBySocialUser(loginUser).then(res => {
                        resolve(res)
                    }, error => {
                        reject(error)
                    })
                }
                else {
                    reject(err)
                }
            });
        })
    }


    findLoginUserByUsername(username: string, accessToken: string, userType: string) {
        var user: User
        return new Promise((resolve, reject) => {
            this.userProvider.findUserByUsername(username, accessToken, userType).subscribe(res => {
                user = res.json();
                resolve(user)
            }, error => {
                reject(error)
            });
        })

    }

    createUserBySocialUser(user: User) {

        var user: User
        return new Promise((resolve, reject) => {
            this.userProvider.createUser(user).subscribe(res => {
                resolve(res.json())
            }, error => {
                reject(error)
            })
        })
    }
}
