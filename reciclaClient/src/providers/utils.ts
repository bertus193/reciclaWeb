import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../app/app-config';
import { StoragePoint } from '../models/storagePoint';
import { Position } from '../models/position';
import { ItemType } from '../models/itemType';
import { Observable } from 'rxjs/Rx'


@Injectable()
export class UtilsProvider {

    constructor(
        public http: Http,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig) { }

    public getNearestStoragePointByItemType(currentPosition: Position, itemType: ItemType): Observable<{ storagePoint: StoragePoint, status: number }> {
        var status: number
        var storagePointList: StoragePoint[]
        var storagePoint: StoragePoint
        return this.http.get(this.config.apiEndpoint + "/storages/itemType/" + itemType + '/storagePoints').map(res => {
            status = res.status
            if (status === 200) {
                storagePointList = res.json();
                storagePoint = storagePointList[0];
                for (let currentSPoint of storagePointList) {
                    if ((currentPosition.latitude - currentSPoint.position.latitude) < (currentPosition.latitude - storagePoint.position.latitude)) {
                        if ((currentPosition.longitude - currentSPoint.position.longitude) < (currentPosition.longitude - storagePoint.position.longitude)) {
                            storagePoint = currentSPoint
                        }
                    }
                }
            }
            return { storagePoint, status }
        }).catch(error => {
            return Observable.throw(error);
        });
    }

    rad = function (x) {
        return x * Math.PI / 180;
    };

    public calculateDistance(StartP: Position, EndP: Position) {
        var Radius = 6371;// radius of earth in Km
        var lat1 = StartP.latitude;
        var lat2 = EndP.latitude;
        var lon1 = StartP.longitude;
        var lon2 = EndP.longitude;
        var dLat = this.rad(lat2 - lat1);
        var dLon = this.rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(this.rad(lat1))
            * Math.cos(this.rad(lat2)) * Math.sin(dLon / 2)
            * Math.sin(dLon / 2);
        var c = 2 * Math.asin(Math.sqrt(a));
        var valueResult = Radius * c;
        var meter = valueResult * 1000;

        return Math.round(meter);
    }

    public getZoomLevel(distance: number) {
        var radius = distance / 2;
        var scale = radius / 500;
        var zoomLevel = Math.round(16 - Math.log(scale) / Math.log(2));
        return zoomLevel;
    }

    public calculateZoom(userPosition: Position, storagePosition: Position): Observable<number> {
        var distance = this.calculateDistance(userPosition, storagePosition)
        var zoomLevel = this.getZoomLevel(distance)
        return Observable.of(zoomLevel)
    }
}