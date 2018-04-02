import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { UserProvider } from '../../../providers/api/userProvider';
import { NotificationProvider } from '../../../providers/notifications';
import { LoadingController, Loading, App } from 'ionic-angular';
import { User } from '../../../models/user';
import { UUID } from 'angular2-uuid';
import { APP_CONFIG_TOKEN, ApplicationConfig } from '../../../app/app-config';
import { SessionProvider } from '../../../providers/session';
import { TabsPage } from '../../tabs/tabs';

@Component({
    selector: 'page-normalRegister',
    templateUrl: 'normalRegister.html'
})
export class NormalRegisterPage {

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
        private sessionProvider: SessionProvider
    ) {
        this.registerForm = this.formBuilder.group({
            email: [''],
            password: [''],
            password_repeat: [''],
        }, {
                validator: NormalRegisterPage.MatchPassword
            });
    }

    ionViewDidLoad() {
    }

    public register_Button() {
        this.loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });
        this.loading.present()

        var emailForm = this.registerForm.get("email")
        var passwordForm = this.registerForm.get("password")

        let uuid = UUID.UUID();

        var user: User = {
            id: null,
            email: emailForm.value,
            password: passwordForm.value,
            name: 'Nombre',
            fullName: 'Nombre Completo',
            profilePicture: 'assets/imgs/quieroReciclar.png',
            accessToken: uuid.toString(),
            recycleItems: null,
            createdDate: new Date(),
            lastPosition: null
        }

        this.userProvider.createUser(user).subscribe(res => {
            this.loading.dismiss()
            if (res.status == 201) {
                this.notificationProvider.presentAlertOk("¡El usuario ha sido creado correctamente!")
                user = res.json()
                this.sessionProvider.updateSession(user)
                this.app.getRootNavs()[0].setRoot(TabsPage)
            }
            else {
                this.notificationProvider.presentAlertError('El usuario no ha podido ser creado.')
            }
        }, error => {
            this.loading.dismiss()

            if (error.status == 409) {
                this.notificationProvider.presentAlertError("Ya existe un usuario con dicho correo.")
            }
            else {
                this.notificationProvider.presentAlertError(this.config.defaultTimeoutMsg)
            }

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
}