import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TypeRecycle } from '../../models/typeRecicle';
import { RecycleItem } from '../../models/recycleItem';
import { SessionProvider } from '../../providers/session';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApplicationConfig } from '../../app/app-config';

@Component({
    selector: 'page-recycleFinish',
    templateUrl: 'recycleFinish.html'
})
export class recycleFinishPage {

    recycleItemType: TypeRecycle
    storageId: number
    recycleValue: number
    msg: string = ""

    options: any


    constructor(private navCtrl: NavController,
        private sessionProvider: SessionProvider,
        private http: Http,
        private config: ApplicationConfig,
        private navParams: NavParams) {
        this.recycleItemType = navParams.get("typeRecycle");
        this.storageId = navParams.get("storageId");
        this.recycleValue = navParams.get("recycleValue");
    }

    ionViewDidLoad() {
        this.options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
    }

    public recycleFinish() {
        this.sessionProvider.getSession().then(res => {
            var recycleItem: RecycleItem
            recycleItem.itemType.type = this.recycleItemType
            recycleItem.itemType.recycleValue = this.recycleValue
            recycleItem.storage = this.storageId
            recycleItem.user = res
            return this.http.post(this.config.apiEndpoint + "/recycleItems", JSON.stringify(recycleItem), this.options).map(function (res) {
                var status = res.status;
                if (status === 201) {
                    this.msg = "Item creado correctamente."
                }

            });
        })



    }





}
