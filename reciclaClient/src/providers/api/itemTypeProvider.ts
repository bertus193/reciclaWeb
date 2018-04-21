import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../app/app-config';
import { ItemType } from '../../models/itemType';


@Injectable()
export class ItemTypeProvider {

    requestJsonOptions = new RequestOptions({
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    constructor(
        private http: Http,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig) { }


    public getRecycleItemItemTypeBylabelAnnotations(labelResponseList: any) {
        return this.http.post(this.config.apiEndpoint + '/itemTypeName/labelAnnotations', JSON.stringify(labelResponseList), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }
}