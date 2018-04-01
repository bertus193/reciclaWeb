import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { RecycleItem } from '../../../../models/recycleItem';
import { SessionProvider } from '../../../../providers/session';
import { User } from '../../../../models/user';
import { UtilsProvider } from '../../../../providers/utils';
import { RecycleItemsProvider } from '../../../../providers/api/recycleItemsProvider';

@Component({
    selector: 'page-recycleItemInfo',
    templateUrl: 'recycleItemInfo.html'
})
export class recycleItemInfoPage {

    recycleItemId: number
    recycleItem: RecycleItem

    showLoadingMsg = true
    errorLoadingContent = false

    constructor(
        private navParams: NavParams,
        private sessionProvider: SessionProvider,
        private utilsProvider: UtilsProvider,
        private recycleItemsProvider: RecycleItemsProvider
    ) {
        this.recycleItemId = this.navParams.get("recycleItemId");
    }

    ionViewDidLoad() {
        var status: number

        this.sessionProvider.getSession().then((user: User) => {
            this.recycleItemsProvider.getRecycleItemById(this.recycleItemId, user.accessToken).subscribe(res => {
                status = res.status

                if (status === 200) {
                    this.recycleItem = res.json();
                }
                this.showLoadingMsg = false
            }, error => {
                this.showLoadingMsg = false
                this.errorLoadingContent = true
            });
        }, err => {
            this.showLoadingMsg = false
            this.errorLoadingContent = true
        });
    }

    getItemType(itemTypeId: (number | string)): (number | string) {
        return this.utilsProvider.getItemType(itemTypeId)
    }
}
