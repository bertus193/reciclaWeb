import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { LoadingController, Loading, App } from 'ionic-angular';
import { UserProvider } from '../../../../../providers/api/userProvider';
import { NotificationProvider } from '../../../../../providers/notifications';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../../../../app/app-config';
import { SessionProvider } from '../../../../../providers/session';
import { EncryptProvider } from '../../../../../providers/encryptProvider';
import { User } from '../../../../../models/user';
import { TabsPage } from '../../../../tabs/tabs';

@Component({
    selector: 'page-recoverPassword',
    templateUrl: 'recoverPassword.html'
})
export class RecoverPasswordPage {

    email: any
    password: any
    password_repeat: any
    registerForm: FormGroup
    loading: Loading

    @Output() onRegisterFinishEvent: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private app: App,
        private formBuilder: FormBuilder,
        private userProvider: UserProvider,
        private notificationProvider: NotificationProvider,
        private loadingCtrl: LoadingController,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        private sessionProvider: SessionProvider,
        private encryptProvider: EncryptProvider
    ) {
        this.registerForm = this.formBuilder.group({
            email: [''],
            code: [''],
            password: [''],
            password_repeat: [''],
        }, {
                validator: [RecoverPasswordPage.MatchPassword, RecoverPasswordPage.EmailIsValid]
            });
    }

    ionViewDidLoad() {
    }

    public recoverAccount_Button() {
        this.loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });
        this.loading.present()

        var emailForm = this.registerForm.get("email")
        var codeForm = this.registerForm.get("code")
        var passwordForm = this.registerForm.get("password")

        var password = this.encryptProvider.encryptPassword(passwordForm.value)

        var user: User = new User()

        user.email = emailForm.value
        user.password = password
        user.resetPwdCode = codeForm.value

        this.userProvider.recoverUser(user).subscribe(res => {
            this.loading.dismiss()

            this.notificationProvider.presentAlertOk("Los datos son correctos!")
            user = res.json()
            this.sessionProvider.updateSession(user)
            this.app.getRootNavs()[0].setRoot(TabsPage)

        }, error => {
            this.loading.dismiss()
            var errorMsg: string = this.config.defaultTimeoutMsg
            switch (error.status) {
                case 401:
                    errorMsg = "El código y/o el correo no son correctos"
                    break;
                case 410:
                    errorMsg = "El código introducido ya no es válido, debes crear uno nuevo."
                    break;
                case 404:
                    errorMsg = "Dicho usuario no existe"
                    break;
            }

            this.notificationProvider.presentAlertError(errorMsg)
        })

    }

    public goToLogin_Button() {
        this.onRegisterFinishEvent.emit('login');
    }


    static MatchPassword(control: FormGroup) {

        let password: AbstractControl = control.controls.password; // to get value in input tag
        let password_repeat: AbstractControl = control.controls.password_repeat; // to get value in input tag

        if (password.value != '' && password_repeat.value != '') {
            if (password.value != password_repeat.value) {
                password_repeat.setErrors({ MatchPassword: true })
            } else {
                password_repeat.setErrors(null)
                return null
            }
        }

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