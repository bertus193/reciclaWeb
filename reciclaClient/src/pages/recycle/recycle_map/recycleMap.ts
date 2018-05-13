import { Component, Inject } from '@angular/core';
import { NavParams, AlertController, Platform, LoadingController, Loading, Events, NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { GoogleMaps, GoogleMapsEvent, GoogleMapOptions, MarkerOptions, Marker, LatLng, GoogleMap } from '@ionic-native/google-maps';
import { Position } from '../../../models/position';
import { NotificationProvider } from '../../../providers/notifications';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../../app/app-config';
import { RecycleItem } from '../../../models/recycleItem';
import { SessionProvider } from '../../../providers/session';
import { PopoverMap } from './popover_map/popoverMap';
import { UtilsProvider } from '../../../providers/utils';
import { RecycleItemsProvider } from '../../../providers/api/recycleItemsProvider';
import { ItemTypeProvider } from '../../../providers/api/itemTypeProvider';
import { ItemType } from '../../../models/itemType';
import { StoragePoint } from '../../../models/storagePoint';
import { User } from '../../../models/user';

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
    itemTypeList: ItemType[] = []

    loading: Loading;

    currentPlatformIsBrowser: boolean = false

    showLeaveAlertMessage: boolean = true

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

        this.recycleItem = this.navParams.get("recycleItem"); //recycleitem.storage -> storageposition
        this.myPosition = this.navParams.get("myPosition");
        this.isitemTypeName = this.navParams.get("isitemTypeName")
        this.itemTypeList = this.navParams.get("itemTypeList")
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    ionViewCanLeave() {
        if (this.showLeaveAlertMessage) {
            let alertPopup = this.alertCtrl.create({
                title: '¿Volver?',
                message: 'Si vuelves perderás los cambios',
                buttons: [{
                    text: 'Sí',
                    handler: () => {
                        this.showLeaveAlertMessage = false;
                        alertPopup.dismiss().then(() => {
                            this.showLeaveAlertMessage = false
                            this.navCtrl.pop()
                        });
                    }
                },
                {
                    text: 'No'
                }]
            });

            // Show the alert
            alertPopup.present();

            // Return false to avoid the page to be popped up
            return false;
        }
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
                this.initMarkers(this.recycleItem.storage.position, this.recycleItem.storage.name, this.recycleItem.itemType.typeColor)
                this.sessionProvider.getUserHelp().then(res => {
                    if (res == null) {
                        let alertPopup = this.alertCtrl.create({
                            title: "Ayuda",
                            message: 'Puedes ver la ruta más rápida desde el menú superior',
                            buttons: [{
                                text: 'No volver a mostrar este mensaje',
                                handler: () => {
                                    alertPopup.dismiss().then(() => {
                                        this.sessionProvider.setUserHelp(false)
                                    });
                                }
                            },
                            {
                                text: 'De acuerdo'
                            }]
                        });
                        // Show the alert
                        alertPopup.present();
                    }
                })

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
            content: 'Guardando...',
            enableBackdropDismiss: true
        });
        this.loading.present()

        var saveRecycleItem: RecycleItem = this.recycleItem

        this.sessionProvider.getSession().then(user => {
            saveRecycleItem.storage = saveRecycleItem.storage.id
            this.recycleItemsProvider.saveRecycleItem(saveRecycleItem, user.accessToken).subscribe(resSaveItem => {
                var status = resSaveItem.status;
                if (status === 201) {

                    this.itemTypeProvider.findItemTypeById(saveRecycleItem.itemType).subscribe(res => {

                        user.points = user.points + res.json().recycleValue
                        this.sessionProvider.updateSession(user)

                        this.recycledAlready = true
                        this.loading.dismiss()
                        this.notificationProvider.presentAlertOk('Se ha guardadado correctamente este reciclado!')
                        this.showLeaveAlertMessage = false
                        this.navCtrl.pop()
                        var savedItem: RecycleItem = resSaveItem.json()
                        savedItem.recycleUser = new User()
                        savedItem.recycleUser.fullName = user.fullName


                        this.events.publish('new-item', savedItem)
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

        for (let i = 0; i < this.itemTypeList.length; i++) {
            if (this.recycleItem.itemType.id == this.itemTypeList[i].id) {
                alert.addInput({
                    type: 'radio',
                    label: this.itemTypeList[i].typeEs,
                    value: i.toString(),
                    checked: true
                });
            }
            else {
                alert.addInput({
                    type: 'radio',
                    label: this.itemTypeList[i].typeEs,
                    value: i.toString()
                });
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
                this.recycleItem.itemType = this.itemTypeList[data]
                if (this.modifiedItemName == false && this.isitemTypeName == true) {
                    this.recycleItem.name = this.itemTypeList[data].typeEs
                }
                this.callGetNearestStoragePointByItemType()
            }
        });
        alert.present();
    }

    callGetNearestStoragePointByItemType() {
        this.utilsProvider.getNearestStoragePointByItemType(this.myPosition, this.recycleItem.itemType.id).then((result: StoragePoint) => {
            this.recycleItem.storage.position = result.position
            this.loading.dismiss()
            this.initMarkers(result.position, result.name, this.recycleItem.itemType.typeColor)
        }, error => { // Error undefined desde cordova browser /itemTypes/undefined/storagePoints
            this.loading.dismiss()
            if (error.status == 404) {
                this.notificationProvider.presentTopToast('No hay ningún punto de reciclaje cercano.');
            }
            else {
                this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg)
            }
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
}
