import { Component, Inject } from '@angular/core';

import { Http } from "@angular/http";
import 'rxjs/add/operator/map'

import { Observable } from 'rxjs/Rx'
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../app/app-config';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        private http: Http
    ) {
    }

    ionViewDidLoad() {
    }

    public test() {
        this.test1().subscribe(res => {
            console.log("prueba")
        })
    }

    public test1(): Observable<{ outJson: any, status: number }> {
        var status: any
        //TEST
        return this.http.get(this.config.apiEndpoint + "/users/19/recycleItems").map(res => {
            status = res.status
            var recycleItems: string = ""

            if (status === 200) {
                recycleItems = res.json()
            }
            return { recycleItems, status };
        }).catch(error => {
            return Observable.throw(error);
        });
    }

}
