import { Component } from '@angular/core';
import { NavParams, LoadingController, Loading, App } from 'ionic-angular';
import { UserProvider } from '../../../providers/api/userProvider';
import { User } from '../../../models/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SessionProvider } from '../../../providers/session';
import { TabsPage } from '../../tabs/tabs';
import { NotificationProvider } from '../../../providers/notifications';
import { EncryptProvider } from '../../../providers/encryptProvider';
import { TypeUser } from '../../../models/typeUser';

@Component({
    selector: 'page-normalLogin',
    templateUrl: 'normalLogin.html'
})
export class NormalLoginPage {

    defaultPage: string = 'login'

    email: string = ''
    password: string = ''

    loginForm: FormGroup

    loading: Loading

    constructor(
        private app: App,
        private navParams: NavParams,
        private formBuilder: FormBuilder,
        private userProvider: UserProvider,
        private loadingCtrl: LoadingController,
        private sessionProvider: SessionProvider,
        private notificationProvider: NotificationProvider,
        private encryptProvider: EncryptProvider
    ) {
        this.defaultPage = this.navParams.get("defaultPage");

        this.loginForm = this.formBuilder.group({
            email: [''],
            password: ['']
        }, {});
    }

    ionViewDidLoad() {
    }

    public setDefaultPage(defaultPage: string) { //EventEmitter
        this.defaultPage = defaultPage
    }

    public login_Button() {
        this.loading = this.loadingCtrl.create({
            content: 'Iniciando sesión...'
        });
        this.loading.present()

        var emailForm = this.loginForm.get("email")
        var passwordForm = this.loginForm.get("password")

        var password = this.encryptProvider.encryptPassword(passwordForm.value)

        var user: User = {
            id: null,
            email: emailForm.value,
            password: password,
            username: null,
            fullName: null,
            profilePicture: null,
            accessToken: null,
            recycleItems: null,
            createdDate: null,
            lastPosition: null,
            type: TypeUser.Normal
        }

        this.userProvider.login(user).subscribe(res => {
            this.loading.dismiss()
            if (res.status == 200) {
                user = res.json()
                this.sessionProvider.updateSession(user)
                this.app.getRootNavs()[0].setRoot(TabsPage)
            }
        }, error => {
            this.loading.dismiss()
            emailForm.setValue('')
            passwordForm.setValue('')
            this.notificationProvider.presentAlertError("El usuario y/o contrseña son incorrectos.")
        })
    }
}
