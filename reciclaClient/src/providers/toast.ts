import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { User } from '../models/user'
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {
    private user: User

    constructor(
        private toastCtrl: ToastController) {
    }

    public presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }
}
