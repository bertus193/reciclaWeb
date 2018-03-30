import { Component, Inject } from '@angular/core';
import { NavParams, AlertController, Platform, LoadingController, Loading } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
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
import { TypeRecycle } from '../../../models/typeRecicle';
import { PopoverMap } from './popover_map/popoverMap';
import { UtilsProvider } from '../../../providers/utils';

@Component({
    selector: 'page-recycleMap',
    templateUrl: 'recycleMap.html'
})
export class MapPage {

    map: GoogleMap;

    recycledAlready: boolean = false
    recycleItem: RecycleItem
    myPosition: Position;
    loading: Loading;

    constructor(
        private navParams: NavParams,
        private notificationProvider: NotificationProvider,
        private alertCtrl: AlertController,
        private http: Http,
        private sessionProvider: SessionProvider,
        private popoverCtrl: PopoverController,
        private platform: Platform,
        private utilsProvider: UtilsProvider,
        private loadingCtrl: LoadingController,
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
                zoom: 8,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create('map_canvas', mapOptions);

        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
                this.initMarkers(this.recycleItem.storage.position, "Punto más cercano", 'green')
            })
            .catch(error => {
                this.notificationProvider.presentTopToast("Parece que ha habido algún problema")
            });

    }

    initMarkers(storagePosition: Position, title: string, color: string) {
        this.map.clear()

        this.createMarker(this.myPosition, "Yo", 'blue').then((marker: Marker) => {

        })

        this.createMarker(storagePosition, title, color).then((marker: Marker) => {
            marker.showInfoWindow();
        })
        this.utilsProvider.calculateZoom(this.myPosition, storagePosition).subscribe((zoomLevel: number) => {
            var centerX = (storagePosition.latitude + this.myPosition.latitude) / 2;
            var centerY = (storagePosition.longitude + this.myPosition.longitude) / 2;
            var latLng = new LatLng(centerX, centerY)
            this.map.setCameraZoom(zoomLevel)
            this.map.setCameraTarget(latLng)
        }, error => {
            this.notificationProvider.presentTopToast("Error obteniendo la posición más cercana")
        })


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

    viewOnExtenalMap() {
        if (this.platform.is('ios')) {
            window.open('maps://?q=Yo&saddr=' + this.myPosition.latitude + ',' + this.myPosition.longitude + '&daddr=' + this.recycleItem.storage.position.latitude + ',' + this.recycleItem.storage.position.longitude, '_system');
        }
        // android
        else if (this.platform.is('android')) {
            var url = 'http://maps.google.com/?saddr=' + this.myPosition.latitude + ',' + this.myPosition.longitude + '&daddr=' + this.recycleItem.storage.position.latitude + ',' + this.recycleItem.storage.position.longitude
            window.open(url, '_system', 'location=yes'), !1;
        }
    }

    public getItemType(itemTypeId: (number | string)): (number | string) {
        var out: string = "Desconocido"
        if (TypeRecycle[itemTypeId]) {
            out = TypeRecycle[itemTypeId]
        }
        return out
    }

    showRadioModifyItemType() {
        let alert = this.alertCtrl.create();
        alert.setTitle('Selecciona un tipo');

        for (let type in TypeRecycle) {
            if (isNaN(Number(type))) {
                if (this.getItemType(this.recycleItem.itemType) == type) {
                    alert.addInput({
                        type: 'radio',
                        label: type,
                        value: type,
                        checked: true
                    });
                }
                else {
                    alert.addInput({
                        type: 'radio',
                        value: type,
                        label: type,
                    });
                }
            }
        }


        alert.addButton('Cancelar');
        alert.addButton({
            text: 'Cambiar tipo',
            handler: data => {
                this.loading = this.loadingCtrl.create({
                    content: 'Buscando punto más cercano...'
                });
                this.loading.present()
                this.recycleItem.itemType = this.getItemType(data)
                this.utilsProvider.getNearestStoragePointByItemType(this.myPosition, this.recycleItem.itemType).timeout(this.config.defaultTimeoutTime).subscribe(
                    result => {
                        if (result.status == 200) {
                            this.loading.dismissAll()
                            this.initMarkers(result.storagePoint.position, "Punto más cercano", 'green')
                        }
                        else {
                            this.loading.dismissAll()
                            this.notificationProvider.presentTopToast('No hay ningún punto de reciclaje cercano.');
                        }
                    },
                    error => { // Error undefined desde cordova browser /itemType/undefined/storagePoints
                        this.loading.dismissAll()
                        this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg)
                    })
            }
        });
        alert.present();
    }


    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(PopoverMap, {
            mapPage: this
        });
        popover.present({
            ev: myEvent
        });
    }
}
