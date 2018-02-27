import { Component, Inject } from '@angular/core';
import { RecycleItem } from '../../../models/recycleItem';
import { TypeRecycle } from '../../../models/typeRecicle';

import { Observable } from 'rxjs/Rx'
import { Http } from '@angular/http';
import { APP_CONFIG_TOKEN, ApplicationConfig } from '../../../app/app-config';
import { SessionProvider } from '../../../providers/session';
import 'rxjs/add/operator/map'

@Component({
    selector: 'page-myRecycledItems',
    templateUrl: 'myRecycledItems.html'
})
export class myRecycledItemsPage {
    recycleItems: RecycleItem[]
    recycleItemHTML: string
    showLoadingMsg = true

    constructor(
        private http: Http,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        private sessionProvider: SessionProvider,
    ) {
        this.recycleItems = []
        this.getRecycleItems();
    }

    ionViewDidLoad() {
        this.recycleItemHTML =
            "<ion-card><ion-item>" +
            "<ion-avatar item-start>" +
            "<img src='img / marty - avatar.png'>" +
            "</ion-avatar>" +
            "Item Name" +
            "<p>itemType</p>" +
            "<!--{{ user.createdDate | date: 'dd/MM/yyyy H:mm'}}-->" +
            "</ion-item></ion-card>"
    }

    public getItemType(itemTypeId: number): string {
        if (TypeRecycle[itemTypeId]) {
            return TypeRecycle[itemTypeId]
        }
    }

    getRecycleItems() {
        var status: number

        this.sessionProvider.getSession().then(res => {
            this.http.get(this.config.apiEndpoint + "/users/" + res.id + "/recycleItems").subscribe(res => {
                status = res.status
                if (status === 200) {
                    this.recycleItems = res.json();
                }
                this.showLoadingMsg = false
            })
        })
    }


}
