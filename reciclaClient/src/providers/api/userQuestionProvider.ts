import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../app/app-config';


@Injectable()
export class UserQuestionProvider {

    requestJsonOptions = new RequestOptions({
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    constructor(
        private http: Http,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig) { }


    public saveUserReply(user_id: number, question_id: number, reply_id: number, token: string) {
        this.requestJsonOptions.headers.set('X-Auth-Token', token)
        return this.http.post(this.config.apiEndpoint + '/private/userQuestions/' + question_id + '/user/' + user_id + '/reply/' + reply_id, null, this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }
}