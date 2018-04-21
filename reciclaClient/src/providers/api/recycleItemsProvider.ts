import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../app/app-config';
import { RecycleItem } from '../../models/recycleItem';


@Injectable()
export class RecycleItemsProvider {

    requestJsonOptions = new RequestOptions({
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    constructor(
        private http: Http,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig) { }


    public saveRecycleItem(recycleItem: RecycleItem, token: string) {
        this.requestJsonOptions.headers.set('X-Auth-Token', token)
        return this.http.post(this.config.apiEndpoint + "/recycleItems/private", JSON.stringify(recycleItem), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }

    public getRecycleItemById(id: number, token: string) {
        this.requestJsonOptions.headers.set('X-Auth-Token', token)
        return this.http.get(this.config.apiEndpoint + "/recycleItems/private/" + id, this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }

    public getLatestRecycleItems(page: number, perPage: number) {
        return this.http.get(this.config.apiEndpoint + "/recycleItems/latest?page=" + page + "&perPage=" + perPage).timeout(this.config.defaultTimeoutTime)
    }
}