import { Component, Inject } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import {
    GoogleMaps,
    GoogleMapsEvent,
    GoogleMapOptions,
    MarkerOptions,
    Marker,
    LatLng,
    GoogleMap,
} from '@ionic-native/google-maps';
import { Position } from '../../../models/position';
import { NotificationProvider } from '../../../providers/notifications';
import { StoragePoint } from '../../../models/storagePoint';
import { SessionProvider } from '../../../providers/session';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../../app/app-config';
import { RecycleItem } from '../../../models/recycleItem';
import { TypeRecycle } from '../../../models/typeRecicle';

@Component({
    selector: 'page-recycleMap',
    templateUrl: 'recycleMap.html'
})
export class MapPage {

    map: GoogleMap;

    typeRecycle: number;
    myPosition: Position;
    storagePoint: StoragePoint
    recycledAlready: boolean = false

    constructor(
        private navParams: NavParams,
        private navCtrl: NavController,
        private notificationProvider: NotificationProvider,
        private sessionProvider: SessionProvider,
        private http: Http,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig) {

        this.typeRecycle = this.navParams.get("recycleItemType");
        this.myPosition = this.navParams.get("myPosition");
        this.storagePoint = this.navParams.get("storagePoint");
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {
        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: this.myPosition.latitude, // default location
                    lng: this.myPosition.longitude // default location
                },
                zoom: 12,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create('map_canvas', mapOptions);

        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {

                this.createMarker(this.myPosition, "Yo", 'blue').then((marker: Marker) => {
                    marker.showInfoWindow();
                })

                this.createMarker(this.storagePoint.position, "Punto más cercano", 'green').then((marker: Marker) => {
                    marker.showInfoWindow();
                })

            })
            .catch(error => {
                this.notificationProvider.presentTopToast("Parece que ha habido algún problema")
            });

    }

    createMarker(pos: Position, title: string, color: string) {

        let location = new LatLng(pos.latitude, pos.longitude)

        let markerOptions: MarkerOptions = {
            position: location,
            title: title,
            icon: color,
            animation: 'DROP'
        }

        return this.map.addMarker(markerOptions);
    }

    public recycleFinish() {
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        this.sessionProvider.getSession().then(user => {
            var recycleItem: RecycleItem
            recycleItem = {
                id: null,
                name: TypeRecycle[this.typeRecycle],
                image: this.config.defaultImageDirectory,
                recycleUser: user.id,
                storage: this.storagePoint.id,
                itemType: this.typeRecycle,
                createdDate: new Date()
            }
            return this.http.post(this.config.apiEndpoint + "/recycleItems", JSON.stringify(recycleItem), options).timeout(this.config.defaultTimeoutTime).subscribe(res => {
                var status = res.status;
                if (status === 201) {
                    this.recycledAlready = true
                    this.notificationProvider.presentAlertOk('Se ha guardadado correctamente este reciclado!')
                }
                else {
                    this.notificationProvider.presentTopToast("Los datos insertados son incorrectos.")
                }
            }, error => {
                this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg + error)
            })
        }).catch(error => {
            this.notificationProvider.presentTopToast("Error encontrado, por favor contacte con el administrador." + error)
        })
    }



}
