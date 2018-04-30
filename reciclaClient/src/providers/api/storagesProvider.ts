import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../app/app-config';


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


    public getStoragePointsByItemType(itemTypeId: number) {
        return this.http.get(this.config.apiEndpoint + "/storages/itemTypes/" + itemTypeId + '/storagePoints').timeout(this.config.defaultTimeoutTime)
    }
}