import { Component, Inject } from '@angular/core';
import { NavParams, ToastController } from 'ionic-angular';
import { TypeRecycle } from '../../../models/typeRecicle';
import { RecycleItem } from '../../../models/recycleItem';
import { SessionProvider } from '../../../providers/session'

import { Http, RequestOptions } from '@angular/http';

import { Headers } from '@angular/http';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../../app/app-config';

@Component({
    selector: 'page-recycleFinish',
    templateUrl: 'recycleFinish.html'
})
export class recycleFinishPage {

    recycleItemType: number
    storageId: number
    msg: string = ""


    constructor(
        private sessionProvider: SessionProvider,
        private http: Http,
        public toastCtrl: ToastController,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        private navParams: NavParams) {

        this.recycleItemType = this.navParams.get("recycleItemType");
        this.storageId = this.navParams.get("storageId");
    }

    ionViewDidLoad() {

    }

    public recycleFinish() {
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        this.sessionProvider.getSession().then(user => {
            var recycleItem: RecycleItem
            recycleItem = {
                id: null,
                name: TypeRecycle[this.recycleItemType],
                image: "",
                recycleUser: user.id,
                storage: this.storageId,
                itemType: this.recycleItemType,
                createdDate: null
            }
            return this.http.post(this.config.apiEndpoint + "/recycleItems", JSON.stringify(recycleItem), options).subscribe(res => {
                this.msg = "recycleItem: " + JSON.stringify(recycleItem)
                var status = res.status;
                if (status === 201) {
                    this.msg = "Item creado correctamente."
                }
                else {
                    this.presentToast("Los datos insertados son incorrectos.")
                }
            })
        }).catch(error => {
            this.presentToast("Error encontrado, por favor contacte con el administrador." + error)
        })
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }


}
