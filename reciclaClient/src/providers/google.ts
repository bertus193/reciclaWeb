import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../app/app-config';


@Injectable()
export class GoogleCloudServiceProvider {

    requestJsonOptions = new RequestOptions({
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    constructor(
        public http: Http,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig) { }

    getLabels(imageUrl: string) {
        //this.base64.encodeFile(imagePath).then((base64Image: string) => {
        const body = {
            "requests": [
                {
                    "image": {
                        "source": {
                            "imageUri": imageUrl
                        }
                    },
                    "features": [
                        {
                            "type": "LABEL_DETECTION"
                        }
                    ]
                }
            ]
        }
        return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + this.config.googleCloudVisionAPIKey, body).timeout(this.config.defaultTimeoutTime);
    }

    translateToSpanish(text: string) {
        return this.http.get('https://translation.googleapis.com/language/translate/v2?key=' + this.config.googleCloudVisionAPIKey + '&q=' + text + '&target=es').timeout(this.config.defaultTimeoutTime);
    }

    getLabelAnnotations(labelResponseList) {
        return this.http.post(this.config.apiEndpoint + '/itemTypeName/labelAnnotations', JSON.stringify(labelResponseList), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }
}