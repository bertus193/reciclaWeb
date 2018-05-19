import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../app/app-config';
import { SessionProvider } from '../session';
import { User } from '../../models/user';
import { MyMail } from '../../models/myMail';
import { Observable } from 'rxjs/Rx'

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


    public saveUser(user: User, token: string, prev_password: string = "") {

        user.recycleItems = null
        user.questionsDone = null
        this.requestJsonOptions.headers.set('X-Auth-Token', token)
        var parameters: string = ""
        if (prev_password != "") {
            parameters = "?prev_password=" + prev_password
        }
        return this.http.put(this.config.apiEndpoint + "/private/users/" + user.id + parameters, JSON.stringify(user), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime).map(res => {
            this.sessionProvider.updateSession(res.json())
            return Observable.of(res.json())
        }, error => {
            return Observable.of(error)
        })
    }

    public createUser(user: User) {
        return this.http.post(this.config.apiEndpoint + "/users", JSON.stringify(user), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }

    public findUserByUsername(username: string, token: string, userType: string) {
        this.requestJsonOptions.headers.set('X-Auth-Token', token)
        this.requestJsonOptions.headers.set('user-type', userType)
        return this.http.get(this.config.apiEndpoint + "/private/users/username/" + username, this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }

    public getUserRecycleItems(id: number, token: string, page: number, perPage: number) {
        this.requestJsonOptions.headers.set('X-Auth-Token', token)
        return this.http.get(this.config.apiEndpoint + "/private/users/" + id + "/recycleItems?page=" + page + "&perPage=" + perPage, this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }

    public login(user: User) {
        return this.http.post(this.config.apiEndpoint + "/users/login", JSON.stringify(user), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime).map(res => {
            this.sessionProvider.updateSession(res.json())
            return Observable.of(res.json())
        }, error => {
            return Observable.of(error)
        })
    }

    public getTopRankedUsers() {
        return this.http.get(this.config.apiEndpoint + "/users/topRanked/").timeout(this.config.defaultTimeoutTime)
    }

    public sendRecoverMail(myMail: MyMail) {
        return this.http.post(this.config.apiEndpoint + "/users/forget", JSON.stringify(myMail), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }

    public recoverUser(user: User) {
        return this.http.post(this.config.apiEndpoint + "/users/recover", JSON.stringify(user), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }

    public existUserByEmail(email: string) {
        return this.http.get(this.config.apiEndpoint + "/users/exist/email/" + email, this.requestJsonOptions).timeout(this.config.defaultTimeoutTime)
    }
}