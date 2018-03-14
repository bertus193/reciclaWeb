import { Component, Inject } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';

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
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../../app/app-config';
import { RecycleItem } from '../../../models/recycleItem';
import { User } from '../../../models/user';
import { SessionProvider } from '../../../providers/session';

@Component({
    selector: 'page-recycleMap',
    templateUrl: 'recycleMap.html'
})
export class MapPage {

    map: GoogleMap;

    recycledAlready: boolean = false
    recycleItem: RecycleItem
    myPosition: Position;

    constructor(
        private navParams: NavParams,
        private notificationProvider: NotificationProvider,
        private alertCtrl: AlertController,
        private http: Http,
        private sessionProvider: SessionProvider,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig) {

        this.recycleItem = this.navParams.get("recycleItem");
        this.myPosition = this.navParams.get("myPosition");
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

                this.createMarker(this.recycleItem.storage.position, "Punto más cercano", 'green').then((marker: Marker) => {
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

        this.sessionProvider.getSession().then((user: User) => {
            var options = new RequestOptions({
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });
            this.recycleItem.storage = this.recycleItem.storage.id
            this.http.post(this.config.apiEndpoint + "/recycleItems?token=" + user.accessToken, JSON.stringify(this.recycleItem), options).subscribe(res => {
                var status = res.status;
                if (status === 201) {
                    this.recycledAlready = true
                    this.notificationProvider.presentAlertOk('Se ha guardadado correctamente este reciclado!')
                }
                else {
                    this.notificationProvider.presentTopToast("Los datos insertados son incorrectos.")
                }
            }, error => {
                this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg)
            })

        }, err => {
            this.notificationProvider.presentTopToast('Error obteniendo los datos necesarios.')
        });
    }

    public modifyRecycleName() {
        let prompt = this.alertCtrl.create({
            title: 'Modificar nombre',
            message: "Puedes añadirle un nombre personalizado al reciclado.",
            inputs: [
                {
                    name: 'name',
                    placeholder: this.recycleItem.name
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: data => {
                        return null
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        if (data.name.length > 0) {
                            this.recycleItem.name = data.name
                        }
                    }
                }
            ]
        });
        prompt.present()
    }


    /*
        var mapWindow;
    if (this.platform.is('ios')) {
        mapWindow = window.open('maps://?q=Yo&saddr=' + myPosition.latitude + ',' + myPosition.longitude + '&daddr=' + storagePoint.position.latitude + ',' + storagePoint.position.longitude, '_system');
    }
    // android
    else if (this.platform.is('android')) {
        mapWindow = window.open('geo://' + storagePoint.position.latitude + ',' + storagePoint.position.longitude + 'q=' + myPosition.latitude + ',' + myPosition.longitude + '(Yo)', '_system');
    }
    if (mapWindow) {*/
}
