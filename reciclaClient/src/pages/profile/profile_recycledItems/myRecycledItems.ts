import { Component, Inject } from '@angular/core';
import { RecycleItem } from '../../../models/recycleItem';

import { APP_CONFIG_TOKEN, ApplicationConfig } from '../../../app/app-config';
import { SessionProvider } from '../../../providers/session';

import { User } from '../../../models/user';
import { NavController } from 'ionic-angular';
import { recycleItemInfoPage } from './profile_recycledItems_info/recycleItemInfo';
import { UserProvider } from '../../../providers/api/userProvider';

@Component({
    selector: 'page-myRecycledItems',
    templateUrl: 'myRecycledItems.html'
})
export class myRecycledItemsPage {

    user: User
    recycleItems: RecycleItem[] = []
    showLoadingMsg = true
    errorLoadingContent = false

    page: number = 0
    perPage: number = 10
    totalPages: number
    totalElements: number

    constructor(
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        private navCtrl: NavController,
        private sessionProvider: SessionProvider,
        private userProvider: UserProvider
    ) {
        this.perPage = this.config.itemsPerPage

        this.sessionProvider.getSession().then((user: User) => {
            this.user = user
            this.getRecycleItems().then((res: boolean) => {
                this.showLoadingMsg = false
                if (res == false) {
                    this.errorLoadingContent = true
                }
            });
        }, error => {
            this.showLoadingMsg = false
            if (error.status != 404) {
                this.errorLoadingContent = true
            }

        })
    }

    getRecycleItems() {
        var status: number

        return new Promise(resolve => {
            this.userProvider.getUserRecycleItems(this.user.id, this.user.accessToken, this.page, this.perPage).subscribe(res => {
                status = res.status
                if (status === 200) {
                    var resJson = res.json();

                    var tempRecycleList = this.readRecycleItems(resJson.content)
                    this.totalPages = resJson.totalPages
                    this.totalElements = resJson.totalElements

                    for (var i = 0; i < tempRecycleList.length; i++) {
                        this.recycleItems.push(tempRecycleList[i])
                    }
                    resolve(true)
                } else {
                    resolve(false)
                }
            }, error => {
                if (error.status == 404) { // no items found
                    resolve(true)
                }
                else {
                    resolve(false)
                }

            })
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

    doInfinite(infiniteScroll: any) {
        this.page += 1;
        this.getRecycleItems().then((res: boolean) => {
            infiniteScroll.complete();
        });

    }

    showRecycleItemInfo(id: number) {
        this.navCtrl.push(recycleItemInfoPage, {
            recycleItemId: id
        })
    }
}
