import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../app/app-config';
import { ItemType } from '../../models/itemType';


@Injectable()
export class StoragesProvider {

    requestJsonOptions = new RequestOptions({
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    constructor(
        private http: Http,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig) { }


    public getStoragePointsByItemType(itemType: ItemType) {
        return this.http.get(this.config.apiEndpoint + "/storages/itemType/" + itemType + '/storagePoints').timeout(this.config.defaultTimeoutTime)
    }
}