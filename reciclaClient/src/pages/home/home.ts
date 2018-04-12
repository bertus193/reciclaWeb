import { Component, Inject } from '@angular/core';
import { RecycleItemsProvider } from '../../providers/api/recycleItemsProvider';
import { APP_CONFIG_TOKEN, ApplicationConfig } from '../../app/app-config';
import { SessionProvider } from '../../providers/session';
import { User } from '../../models/user';
import { RecycleItem } from '../../models/recycleItem';
import { UtilsProvider } from '../../providers/utils';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    private recycleItems: RecycleItem[] = []
    private user: User

    private page: number = 0
    private perPage: number = 10
    private totalPages: number
    private totalElements: number

    private showLoadingMsg: boolean = true
    private errorLoadingContent: boolean = false

    constructor(
        private recycleItemsProvider: RecycleItemsProvider,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        private sessionProvider: SessionProvider,
        private utilsProvider: UtilsProvider
    ) {

        this.perPage = this.config.itemsPerPage

        this.sessionProvider.getSession().then((user: User) => {
            this.user = user
            this.getLatestRecycleItems().then((res: boolean) => {
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

    private getLatestRecycleItems() {
        var status: number

        return new Promise(resolve => {
            this.recycleItemsProvider.getLatestRecycleItems(this.page, this.perPage).subscribe(res => {
                status = res.status
                if (status === 200) {
                    var resJson = res.json()
                    this.totalPages = resJson.recycleItemList.totalPages
                    this.totalElements = resJson.recycleItemList.totalElements

                    var tempRecycleList = this.readRecycleItems(resJson.recycleItemList.content, resJson.userList)

                    for (var i = 0; i < tempRecycleList.length; i++) {
                        this.recycleItems.push(tempRecycleList[i])
                    }
                    console.log(this.recycleItems)
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

    readRecycleItems(recycleItemList, userList): RecycleItem[] {
        var itemTypeItems = []
        for (let item in recycleItemList) {
            if (!parseInt(recycleItemList[item].itemType)) {
                itemTypeItems.push(recycleItemList[item].itemType)
            }
            else {
                recycleItemList[item].itemType = itemTypeItems.filter(x => x.id == recycleItemList[item].itemType)[0]
            }

            recycleItemList[item].recycleUser = userList.filter(x => x.id == recycleItemList[item].recycleUser)[0]
        }
        return recycleItemList;
    }

    doInfinite(infiniteScroll: any) {
        this.page += 1;
        this.getLatestRecycleItems().then((res: boolean) => {
            infiniteScroll.complete();
        });

    }

    public getItemType(itemTypeId: number): string {
        return this.utilsProvider.getItemType(itemTypeId).toString()
    }
}
