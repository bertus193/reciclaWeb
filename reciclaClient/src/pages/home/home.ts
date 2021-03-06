import { Component, Inject, ViewChild } from '@angular/core';
import { RecycleItemsProvider } from '../../providers/api/recycleItemsProvider';
import { APP_CONFIG_TOKEN, ApplicationConfig } from '../../app/app-config';
import { SessionProvider } from '../../providers/session';
import { User } from '../../models/user';
import { RecycleItem } from '../../models/recycleItem';
import { Content, Events } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    private recycleItems: RecycleItem[] = []
    private users: User[] = []
    private user: User

    private page: number = 0
    private perPage: number = 10
    private totalPages: number
    private totalElements: number

    private showLoadingMsg: boolean = true
    private errorLoadingContent: boolean = false

    @ViewChild(Content) content: Content

    constructor(

        private recycleItemsProvider: RecycleItemsProvider,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        private sessionProvider: SessionProvider,
        private events: Events
    ) {

        this.perPage = this.config.itemsPerPage

        this.sessionProvider.getSession().then((user: User) => {
            this.user = user
            this.getLatestRecycleItems("infinite").then((res: boolean) => {
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

        this.events.subscribe('new-item', (recycleItem) => {
            if (recycleItem.name != null) {
                this.recycleItems.unshift(recycleItem)
                var index = this.users.findIndex(u => u.id == recycleItem.recycleUser.id)
                if (index == -1) {
                    this.users.unshift(recycleItem.recycleUser)
                }
                else {
                    this.move(index, 0)
                }

            }
        });

        this.events.subscribe('update-user-info', (user) => {
            if (user.id != null) {
                var index = this.users.findIndex(u => u.id == user.id)
                if (index != -1) { //not found
                    this.users[index].profilePicture = user.profilePicture
                    this.users[index].fullName = user.fullName
                }
            }
        });

    }

    private move(old_index, new_index) {
        while (old_index < 0) {
            old_index += this.users.length;
        }
        while (new_index < 0) {
            new_index += this.users.length;
        }
        if (new_index >= this.users.length) {
            var k = new_index - this.users.length;
            while ((k--) + 1) {
                this.users.push(undefined);
            }
        }
        this.users.splice(new_index, 0, this.users.splice(old_index, 1)[0]);
    }

    private getLatestRecycleItems(refreshType: string) {
        var status: number

        return new Promise(resolve => {
            this.recycleItemsProvider.getLatestRecycleItems(this.page, this.perPage).subscribe(res => {
                status = res.status
                if (status === 200) {
                    var resJson = res.json()
                    this.totalPages = resJson.recycleItemList.totalPages
                    this.totalElements = resJson.recycleItemList.totalElements

                    /* TOP BAR USER LIST */
                    var tempUserList = resJson.userList
                    if (refreshType == "refresh") {
                        tempUserList = tempUserList.reverse()
                    }

                    for (var i = 0; i < tempUserList.length; i++) {
                        if (refreshType == "refresh") {
                            if (this.users.find(x => x.id == tempUserList[i].id) == null) {
                                this.users.unshift(tempUserList[i])
                            }
                        }
                        else {
                            if (this.users.find(x => x.id == tempUserList[i].id) == null) {
                                this.users.push(tempUserList[i])
                            }
                        }
                    }

                    /* RECYCLEITEM LIST */
                    var tempRecycleList = this.readRecycleItems(resJson.recycleItemList.content, resJson.userList)

                    if (refreshType == "refresh") {
                        tempRecycleList = tempRecycleList.reverse()
                    }

                    for (var j = 0; j < tempRecycleList.length; j++) {
                        if (refreshType == "refresh") {
                            if (this.recycleItems.find(x => x.id == tempRecycleList[j].id) == null) {
                                this.recycleItems.unshift(tempRecycleList[j])
                            }
                        }
                        else {
                            this.recycleItems.push(tempRecycleList[j])
                        }
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
        var refreshType = "infinite"
        this.getLatestRecycleItems(refreshType).then((res: boolean) => {
            infiniteScroll.complete();
        });

    }

    doRefresh(refresher: any) {
        var temporalPage = this.page
        this.page = 0;
        this.getLatestRecycleItems("refresh").then((res: boolean) => {
            refresher.complete();
        });
        this.page = temporalPage
    }

    ionSelected() {
        this.content.scrollToTop()
    }
}
