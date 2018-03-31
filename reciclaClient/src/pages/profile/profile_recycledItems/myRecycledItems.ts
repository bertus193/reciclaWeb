import { Component, Inject } from '@angular/core';
import { RecycleItem } from '../../../models/recycleItem';
import { TypeRecycle } from '../../../models/typeRecicle';

import { Http } from '@angular/http';
import { APP_CONFIG_TOKEN, ApplicationConfig } from '../../../app/app-config';
import { SessionProvider } from '../../../providers/session';
import 'rxjs/add/operator/map'
import { User } from '../../../models/user';
import { NavController } from 'ionic-angular';
import { recycleItemInfoPage } from './profile_recycledItems_info/recycleItemInfo';

@Component({
    selector: 'page-myRecycledItems',
    templateUrl: 'myRecycledItems.html'
})
export class myRecycledItemsPage {

    user: User
    recycleItems: RecycleItem[] = []
    showLoadingMsg = true
    errorLoadingContent = false

    constructor(
        private http: Http,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        private navCtrl: NavController,
        private sessionProvider: SessionProvider,
    ) {
        this.sessionProvider.getSession().then((user: User) => {
            this.user = user
            this.getRecycleItems();
        }, error => {
            this.showLoadingMsg = false
            this.errorLoadingContent = true
        })
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

        this.http.get(this.config.apiEndpoint + "/users/private/" + this.user.id + "/recycleItems?page=0&perPage=2&token=" + this.user.accessToken).timeout(this.config.defaultTimeoutTime).subscribe(res => {
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

    showRecycleItemInfo(id: number) {
        this.navCtrl.push(recycleItemInfoPage, {
            recycleItemId: id
        })
    }
}
