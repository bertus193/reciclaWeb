import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
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


    public saveUser(user: User, token: string) {
        this.sessionProvider.updateSession(user)
        user.recycleItems = null
        this.requestJsonOptions.headers.set('X-Auth-Token', token)
        return this.http.put(this.config.apiEndpoint + "/users/private/" + user.id, JSON.stringify(user), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }

    public createUser(user: User) {
        return this.http.post(this.config.apiEndpoint + "/users", JSON.stringify(user), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }

    public findUserByEmail(email: string) {
        return this.http.get(this.config.apiEndpoint + "/users/email/" + email)
    }

    public getUserRecycleItems(id: number, token: string, page: number, perPage: number) {
        this.requestJsonOptions.headers.set('X-Auth-Token', token)
        return this.http.get(this.config.apiEndpoint + "/users/private/" + id + "/recycleItems?page=" + page + "&perPage=" + perPage, this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }

    public login(user: User) {
        return this.http.post(this.config.apiEndpoint + "/users/login", JSON.stringify(user), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }
}