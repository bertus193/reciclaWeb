import { Component, Inject } from '@angular/core';
import { RecycleItem } from '../../../models/recycleItem';
import { TypeRecycle } from '../../../models/typeRecicle';

import { Http } from '@angular/http';
import { APP_CONFIG_TOKEN, ApplicationConfig } from '../../../app/app-config';
import { SessionProvider } from '../../../providers/session';
import 'rxjs/add/operator/map'
import { User } from '../../../models/user';

@Component({
    selector: 'page-myRecycledItems',
    templateUrl: 'myRecycledItems.html'
})
export class myRecycledItemsPage {
    recycleItems: RecycleItem[]
    recycleItemHTML: string
    showLoadingMsg = true
    errorLoadingContent = false

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
        var out: string = "Desconocido"
        if (TypeRecycle[itemTypeId]) {
            out = TypeRecycle[itemTypeId]
        }
        return out
    }

    getRecycleItems() {
        var status: number

        this.sessionProvider.getSession().then((user: User) => {

            for (let item in user.recycleItems) {

            }
            this.http.get(this.config.apiEndpoint + "/users/" + user.id + "/recycleItems?token=" + user.accessToken).timeout(this.config.defaultTimeoutTime).subscribe(res => {
                status = res.status
                if (status === 200) {
                    var recycleItemTempList = res.json();
                    this.recycleItems = this.readRecycleItems(recycleItemTempList)

                } else {
                    this.errorLoadingContent = true
                }
                this.showLoadingMsg = false
            }, error => {
                this.showLoadingMsg = false
                this.errorLoadingContent = true
            })
        }).catch(error => {
            this.showLoadingMsg = false
            this.errorLoadingContent = true
        })
    }

    readRecycleItems(recycleItemList): RecycleItem[] {
        var itemTypeItems = []
        for (let item in recycleItemList) {
            if (!parseInt(recycleItemList[item].itemType)) {
                itemTypeItems.push(recycleItemList[item].itemType)
            }
            else {
                recycleItemList[item].itemType = itemTypeItems.filter(x => x.id == recycleItemList[item].itemType)[0]
            }
        }
        return recycleItemList;
    }


}
