import { Injectable } from '@angular/core';

import { ToastController, AlertController } from 'ionic-angular';

@Injectable()
export class NotificationProvider {

    constructor(
        private toastCtrl: ToastController,
        private alertCtrl: AlertController) {
    }

    public presentTopToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 5000,
            position: 'top'
        });
        toast.present();
    }

    public presentPersistentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            position: 'top',
            showCloseButton: true,
            closeButtonText: 'Cerrar'

        });
        toast.present();
    }

    public presentAlertOk(text) {
        let alert = this.alertCtrl.create({
            title: '¡Ya está!',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    }


    public presentAlertError(text) {
        let alert = this.alertCtrl.create({
            title: 'Ups, error!',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    }

}
