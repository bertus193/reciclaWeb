import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { StoragePoint } from '../models/storagePoint';
import { Position } from '../models/position';
import { Observable } from 'rxjs/Rx'
import { StoragesProvider } from './api/storagesProvider';


@Injectable()
export class UtilsProvider {

    constructor(
        private storagesProvider: StoragesProvider
    ) { }

    private calculateDistance(position1: Position, position2: Position): number {
        var R = 6371e3; // metres
        var φ1 = this.rad(position1.latitude);
        var φ2 = this.rad(position2.latitude);
        var Δφ = this.rad(position2.latitude - position1.latitude);
        var Δλ = this.rad(position2.longitude - position1.longitude);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    public getNearestStoragePointByItemType(currentPosition: Position, itemTypeId: number) {
        var status: number
        var storagePointList: StoragePoint[]
        var storagePoint: StoragePoint
        return new Promise((resolve, reject) => {
            this.storagesProvider.getStoragePointsByItemType(itemTypeId).subscribe(res => {
                status = res.status
                storagePointList = res.json();
                storagePoint = storagePointList[0];
                for (let currentSPoint of storagePointList) {
                    if (this.calculateDistance(currentPosition, currentSPoint.position) < this.calculateDistance(currentPosition, storagePoint.position)) {
                        storagePoint = currentSPoint
                    }
                }
                resolve(storagePoint)
            }, error => {
                reject(error)
            });
        })
    }

    rad = function (x) {
        return x * Math.PI / 180;
    };

    public getZoomLevel(distance: number) {
        var radius = distance / 2;
        var scale = radius / 500;
        var zoomLevel = Math.floor(16 - Math.log(scale) / Math.log(2));
        return zoomLevel;
    }

    public calculateZoom(userPosition: Position, storagePosition: Position): Observable<number> {
        var distance = this.calculateDistance(userPosition, storagePosition)
        var zoomLevel = this.getZoomLevel(distance)
        return Observable.of(zoomLevel)
    }
}