import { Component, Inject } from '@angular/core';
import { NavParams, AlertController, Platform, LoadingController, Loading, Events, NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { GoogleMaps, GoogleMapsEvent, GoogleMapOptions, MarkerOptions, Marker, LatLng, GoogleMap } from '@ionic-native/google-maps';
import { Position } from '../../../models/position';
import { NotificationProvider } from '../../../providers/notifications';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../../app/app-config';
import { RecycleItem } from '../../../models/recycleItem';
import { User } from '../../../models/user';
import { SessionProvider } from '../../../providers/session';
import { TypeRecycle, TypeRecycle_Color_EN } from '../../../models/typeRecicle';
import { PopoverMap } from './popover_map/popoverMap';
import { UtilsProvider } from '../../../providers/utils';
import { RecycleItemsProvider } from '../../../providers/api/recycleItemsProvider';
import { ItemTypeProvider } from '../../../providers/api/itemTypeProvider';

@Component({
    selector: 'page-recycleMap',
    templateUrl: 'recycleMap.html'
})
export class MapPage {

    map: GoogleMap;

    recycledAlready: boolean = false

    recycleItem: RecycleItem
    myPosition: Position;
    isitemTypeName: boolean = false
    modifiedItemName: boolean = false

    loading: Loading;

    currentPlatformIsBrowser: boolean = false

    user: User

    constructor(
        private navParams: NavParams,
        private notificationProvider: NotificationProvider,
        private alertCtrl: AlertController,
        private sessionProvider: SessionProvider,
        private popoverCtrl: PopoverController,
        private platform: Platform,
        private utilsProvider: UtilsProvider,
        private loadingCtrl: LoadingController,
        private recycleItemsProvider: RecycleItemsProvider,
        private events: Events,
        private navCtrl: NavController,
        private itemTypeProvider: ItemTypeProvider,
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig) {

        if (this.platform.is('mobileweb') || this.platform.is('core')) {
            this.currentPlatformIsBrowser = true
        }

        this.recycleItem = this.navParams.get("recycleItem");
        this.myPosition = this.navParams.get("myPosition");
        this.isitemTypeName = this.navParams.get("isitemTypeName")
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
                this.initMarkers(this.recycleItem.storage.position, "Punto más cercano", TypeRecycle_Color_EN[this.recycleItem.itemType])

                this.notificationProvider.presentBottomToast("Puedes ver la ruta más rápida desde el menú superior")
            })
            .catch(error => {
                this.notificationProvider.presentTopToast("Parece que ha habido algún problema")
            });

    }

    initMarkers(storagePosition: Position, title: string, itemTypeColor: string) {
        this.map.clear()

        this.createMarker(this.myPosition, "Yo", 'red').then((marker: Marker) => {

        })

        this.createMarker(storagePosition, title, itemTypeColor).then((marker: Marker) => {
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
        this.loading = this.loadingCtrl.create({
            content: 'Guardando...'
        });
        this.loading.present()

        var savedStorage: Storage = this.recycleItem.storage

        this.sessionProvider.getSession().then(user => {
            this.recycleItem.storage = this.recycleItem.storage.id
            this.recycleItemsProvider.saveRecycleItem(this.recycleItem, user.accessToken).subscribe(res => {
                var status = res.status;
                if (status === 201) {

                    this.itemTypeProvider.findItemTypeById(this.recycleItem.itemType).subscribe(res => {

                        user.points = user.points + res.json().recycleValue
                        this.sessionProvider.updateSession(user)

                        this.recycledAlready = true
                        this.loading.dismiss()
                        this.notificationProvider.presentAlertOk('Se ha guardadado correctamente este reciclado!')
                        this.navCtrl.pop()
                        this.events.publish('change-tab', "profile", "history")
                        this.events.publish('update-user', user)
                    }, error => {
                        this.loading.dismiss()
                        this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg)
                    })
                }
                else {
                    this.loading.dismiss()
                    this.notificationProvider.presentTopToast("Los datos insertados son incorrectos.")
                }
            }, error => {
                this.loading.dismiss()
                this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg)
            })
        }, err => {
            this.loading.dismiss()
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
                            this.modifiedItemName = true
                        }
                    }
                }
            ]
        });
        prompt.present()
    }

    viewOnExtenalMap() {
        let prompt = this.alertCtrl.create({
            title: 'Mostrar la mejor ruta',
            message: "Se abrirá la aplicación de mapas, después podrás volver para finalizar el reciclaje.",
            buttons: [
                {
                    text: 'Cancelar',
                    handler: data => {
                        return null
                    }
                },
                {
                    text: 'Ver ruta',
                    handler: data => {
                        if (this.platform.is('ios')) {
                            window.open('maps://?q=Yo&saddr=' + this.myPosition.latitude + ',' + this.myPosition.longitude + '&daddr=' + this.recycleItem.storage.position.latitude + ',' + this.recycleItem.storage.position.longitude, '_system');
                        }
                        else if (this.platform.is('android')) {
                            var url = 'http://maps.google.com/?saddr=' + this.myPosition.latitude + ',' + this.myPosition.longitude + '&daddr=' + this.recycleItem.storage.position.latitude + ',' + this.recycleItem.storage.position.longitude
                            window.open(url, '_system', 'location=yes'), !1;
                        }
                    }
                }
            ]
        });
        prompt.present()
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
                this.recycleItem.itemType = this.getItemType(data) // string to number
                if (this.modifiedItemName == false && this.isitemTypeName == true) {
                    this.recycleItem.name = data
                }
                this.callGetNearestStoragePointByItemType()
            }
        });
        alert.present();
    }

    callGetNearestStoragePointByItemType() {
        this.utilsProvider.getNearestStoragePointByItemType(this.myPosition, this.recycleItem.itemType).timeout(this.config.defaultTimeoutTime).subscribe(result => {
            if (result.status == 200) {
                this.recycleItem.storage.position = result.storagePoint.position
                this.loading.dismiss()
                this.initMarkers(result.storagePoint.position, "Punto más cercano", TypeRecycle_Color_EN[this.recycleItem.itemType])
            }
            else {
                this.loading.dismiss()
                this.notificationProvider.presentTopToast('No hay ningún punto de reciclaje cercano.');
            }
        }, error => { // Error undefined desde cordova browser /itemType/undefined/storagePoints
            this.loading.dismiss()
            this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg)
        })
    }


    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(PopoverMap, {
            mapPage: this
        });
        popover.present({
            ev: myEvent
        });
    }

    getItemType(itemTypeId: (number | string)): (number | string) {
        return this.utilsProvider.getItemType(itemTypeId)
    }
}
