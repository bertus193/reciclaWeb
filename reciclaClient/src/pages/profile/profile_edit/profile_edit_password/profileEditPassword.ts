import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Loading, LoadingController, NavParams, NavController } from 'ionic-angular';
import { UserProvider } from '../../../../providers/api/userProvider';
import { User } from '../../../../models/user';
import { NotificationProvider } from '../../../../providers/notifications';
import { EncryptProvider } from '../../../../providers/encryptProvider';

@Component({
    selector: 'page-profileEditPassword',
    templateUrl: 'profileEditPassword.html'
})
export class ProfileEditPasswordPage {

    email: any
    password: any
    password_repeat: any
    profileEditPasswordForm: FormGroup
    loading: Loading
    user: User

    constructor(
        private formBuilder: FormBuilder,
        private loadingCtrl: LoadingController,
        private userProvider: UserProvider,
        private navParams: NavParams,
        private navCtrl: NavController,
        private encryptProvider: EncryptProvider,
        private notificationProvider: NotificationProvider
    ) {
        this.profileEditPasswordForm = this.formBuilder.group({
            prev_password: [''],
            password: [''],
            password_repeat: [''],
        }, {
                validator: ProfileEditPasswordPage.MatchPassword
            });

        this.user = this.navParams.get('user')
    }

    ionViewDidLoad() {
    }

    public editPassword_Button() {
        this.loading = this.loadingCtrl.create({
            content: 'Guardando usuario...'
        });
        this.loading.present()
        var password = this.profileEditPasswordForm.get("prev_password").value
        this.user.password = this.encryptProvider.encryptPassword(password)

        this.userProvider.login(this.user).subscribe(res => {

            password = this.profileEditPasswordForm.get("password").value
            this.user.password = this.encryptProvider.encryptPassword(password)

            this.userProvider.saveUser(this.user, this.user.accessToken).subscribe(res => {
                this.notificationProvider.presentTopToast("La contraseña ha sido modificada correctamente!")
                this.navCtrl.pop()
                this.loading.dismiss()

            }, error => {
                this.loading.dismiss()
                this.notificationProvider.presentTopToast("Error, no se ha podido guardar la contraseña.")
            })

        }, error => {
            if (error.status == 403) {
                this.loading.dismiss()
                this.notificationProvider.presentAlertError("La contraseña actual no es correcta.")
            }
            else {
                this.loading.dismiss()
                this.notificationProvider.presentTopToast("Error, no se ha podido guardar la contraseña.")
            }
        })
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