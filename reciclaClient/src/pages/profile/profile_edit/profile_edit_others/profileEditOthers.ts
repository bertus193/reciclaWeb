import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Loading, LoadingController, NavParams, NavController } from 'ionic-angular';
import { UserProvider } from '../../../../providers/api/userProvider';
import { User } from '../../../../models/user';
import { NotificationProvider } from '../../../../providers/notifications';
import { Collective } from '../../../../models/collective';
import { CollectiveProvider } from '../../../../providers/api/collectiveProvider';
import { isNumber } from 'ionic-angular/util/util';

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

        this.user = this.navParams.get('user')

        var birthDate = new Date().toISOString()
        if (this.user.birthdate != null) {
            birthDate = this.user.birthdate.toString()
        }

        this.profileEditOthersForm = this.formBuilder.group({
            collective: [this.user.collective.id],
            birthdate: [birthDate],
            school: [this.user.school],
            gender: [this.user.gender],
        }, {});



        this.collectiveProvider.getAllCollectives().subscribe(res => {
            this.collectives = res.json()
        })
    }

    public editPassword_Button() {
        this.loading = this.loadingCtrl.create({
            content: 'Guardando usuario...'
        });
        this.loading.present()

        var collective: any = this.profileEditOthersForm.get("collective").value
        var birthdate = this.profileEditOthersForm.get("birthdate").value
        var gender = this.profileEditOthersForm.get("gender").value
        var school = this.profileEditOthersForm.get("school").value

        if (isNumber(collective)) {
            this.user.collective = this.collectives.filter(e => e.id === collective)[0];
        }
        if (gender != null && gender != '') {
            this.user.gender = gender
        }

        this.user.school = school

        if (birthdate != null && birthdate != '') {
            var date = new Date(birthdate)
            if (date != null) {
                this.user.birthdate = date.toISOString()
            }
        }

        this.userProvider.saveUser(this.user, this.user.accessToken).subscribe(res => {
            this.notificationProvider.presentTopToast("El usuario ha sido modificado correctamente!")
            this.navCtrl.pop()
            this.loading.dismiss()
        }, error => {
            this.loading.dismiss()
            this.notificationProvider.presentTopToast("Error, no se ha podido guardar el usuario.")
        })
    }
}