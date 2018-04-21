import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../app/app-config';


@Injectable()
export class QuestionProvider {

    requestJsonOptions = new RequestOptions({
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    constructor(
        private http: Http,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig) { }


    public getRandomQuestion() {
        return this.http.get(this.config.apiEndpoint + '/questions/random').timeout(this.config.defaultTimeoutTime)
    }
}