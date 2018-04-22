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


    public getRandomQuestion(id: number, token: string) {
        this.requestJsonOptions.headers.set('X-Auth-Token', token)
        return this.http.get(this.config.apiEndpoint + '/private/questions/user/' + id + '/random', this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }
}