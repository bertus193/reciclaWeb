import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Loading, LoadingController, NavParams, NavController } from 'ionic-angular';
import { UserProvider } from '../../../../providers/api/userProvider';
import { User } from '../../../../models/user';
import { NotificationProvider } from '../../../../providers/notifications';
import { Collective } from '../../../../models/collective';
import { CollectiveProvider } from '../../../../providers/api/collectiveProvider';

@Component({
    selector: 'page-profileEditOthers',
    templateUrl: 'profileEditOthers.html'
})
export class ProfileEditOthersPage {

    email: any
    password: any
    password_repeat: any
    profileEditOthersForm: FormGroup
    loading: Loading
    user: User
    collectives: Collective[] = []

    constructor(
        private formBuilder: FormBuilder,
        private loadingCtrl: LoadingController,
        private userProvider: UserProvider,
        private navParams: NavParams,
        private navCtrl: NavController,
        private notificationProvider: NotificationProvider,
        private collectiveProvider: CollectiveProvider
    ) {
        this.profileEditOthersForm = this.formBuilder.group({
            birthdate: [''],
            school: [''],
            gender: [''],
        }, {});

        this.user = this.navParams.get('user')

        this.collectiveProvider.getAllCollectives().subscribe(res => {
            console.log(res)
            this.collectives = res.json()
        })
    }

    ionViewDidLoad() {
    }

    public editPassword_Button() {
        this.loading = this.loadingCtrl.create({
            content: 'Guardando usuario...'
        });
        this.loading.present()
        var password = this.profileEditOthersForm.get("prev_password").value

        this.userProvider.login(this.user).subscribe(res => {



        }, error => {
            this.loading.dismiss()
            this.notificationProvider.presentTopToast("Error, no se ha podido guardar la contraseña.")
        })
    }
}