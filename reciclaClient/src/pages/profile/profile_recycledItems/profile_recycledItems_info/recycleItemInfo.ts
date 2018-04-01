import { Component, Inject } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { RecycleItem } from '../../../../models/recycleItem';
import { Http } from '@angular/http';
import { APP_CONFIG_TOKEN, ApplicationConfig } from '../../../../app/app-config';
import { SessionProvider } from '../../../../providers/session';
import { User } from '../../../../models/user';
import { UtilsProvider } from '../../../../providers/utils';

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
        private http: Http,
        private sessionProvider: SessionProvider,
        private utilsProvider: UtilsProvider,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig
    ) {
        this.recycleItemId = this.navParams.get("recycleItemId");
    }

    ionViewDidLoad() {
        var status: number

        this.sessionProvider.getSession().then((user: User) => {
            this.http.get(this.config.apiEndpoint + "/recycleItems/private/" + this.recycleItemId + "?token=" + user.accessToken).timeout(this.config.defaultTimeoutTime).subscribe(res => {
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
