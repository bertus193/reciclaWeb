import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NotificationProvider } from './notifications';
import { ApplicationConfig } from '../app/app-config';
import { Observable } from 'rxjs/Observable'


@Injectable()
export class GoogleCloudVisionServiceProvider {

    googleCloudVisionAPIKey: any = 'AIzaSyCVl9Ien_9KOFEN197dPqklyIJ7ad1z44k'

    constructor(
        public http: Http,
        private notificationProvider: NotificationProvider) { }

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
        return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + this.googleCloudVisionAPIKey, body);
    }
}