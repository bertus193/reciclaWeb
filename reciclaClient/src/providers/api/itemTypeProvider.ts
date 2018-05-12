import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../app/app-config';
import { LabelResponseWithImage } from '../../models/labelResponseWithImage';


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


    public getRecycleItemItemTypeBylabelAnnotations(labelResponseList: any, base64Image: string) {
        var labelResponseWithImage = new LabelResponseWithImage(labelResponseList, base64Image)
        return this.http.post(this.config.apiEndpoint + '/itemTypeNames/labelAnnotations', JSON.stringify(labelResponseWithImage), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }

    public findItemTypeById(id: number) {
        return this.http.get(this.config.apiEndpoint + "/itemTypes/" + id).timeout(this.config.defaultTimeoutTime)
    }

    public getAllItemTypes() {
        return this.http.get(this.config.apiEndpoint + "/itemTypes").timeout(this.config.defaultTimeoutTime)
    }
}