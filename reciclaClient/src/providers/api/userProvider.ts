import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../app/app-config';
import { SessionProvider } from '../session';
import { User } from '../../models/user';


@Injectable()
export class UserProvider {

    requestJsonOptions = new RequestOptions({
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    constructor(
        private http: Http,
        private sessionProvider: SessionProvider,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig) { }


    public saveUser(user: User, token: string = '') {
        user.recycleItems = null
        var saveUserToken = user.accessToken
        if (token != '') {
            saveUserToken = token
        }
        this.sessionProvider.updateSession(user)
        return this.http.put(this.config.apiEndpoint + "/users/private/" + user.id + "?token=" + saveUserToken, JSON.stringify(user), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }

    public createUser(user: User) {
        return this.http.post(this.config.apiEndpoint + "/users", JSON.stringify(user), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }

    public findUserByEmail(email: string) {
        return this.http.get(this.config.apiEndpoint + "/users/email/" + email)
    }

    public getUserRecycleItems(id: number, accessToken: string, page: number, perPage: number) {
        return this.http.get(this.config.apiEndpoint + "/users/private/" + id + "/recycleItems?page=" + page + "&perPage=" + perPage + "&token=" + accessToken).timeout(this.config.defaultTimeoutTime)
    }
}