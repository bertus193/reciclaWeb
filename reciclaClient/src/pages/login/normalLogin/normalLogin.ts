import { Component } from '@angular/core';
import { NavParams, LoadingController, Loading, App } from 'ionic-angular';
import { UserProvider } from '../../../providers/api/userProvider';
import { User } from '../../../models/user';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
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
        }, {
                validator: NormalLoginPage.EmailIsValid
            });
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


        var user: User = new User()

        user.email = emailForm.value
        user.password = password
        user.type = TypeUser.Normal

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

    static EmailIsValid(control: FormGroup) {

        let email: AbstractControl = control.controls.email; // to get value in input tag

        var EMAIL_REGEXP = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

        if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(email.value))) {
            email.setErrors({ EmailIsValid: true })
        }
        else {
            return null
        }
    }
}
