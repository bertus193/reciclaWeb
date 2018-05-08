import { Component, Inject } from '@angular/core';
import { NavController, LoadingController, ActionSheetController, Loading, AlertController, Platform } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../app/app-config';

import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map'

import { Position } from '../../models/position';
import { MapPage } from './recycle_map/recycleMap';
import { NotificationProvider } from '../../providers/notifications';
import { GoogleCloudServiceProvider } from '../../providers/google';
import { SessionProvider } from '../../providers/session';
import { User } from '../../models/user';
import { LabelResponse } from '../../models/labelResponse';
import { RecycleItem } from '../../models/recycleItem';
import { UtilsProvider } from '../../providers/utils';
import { UserProvider } from '../../providers/api/userProvider';
import { ItemTypeProvider } from '../../providers/api/itemTypeProvider';
import { ItemType } from '../../models/itemType';
import { Tip } from '../../models/tip';
import { TipProvider } from '../../providers/api/tipProvider';
import { FileProvider } from '../../providers/fileProvider';

@Component({
    selector: 'page-recycle',
    templateUrl: 'recycle.html'
})
export class RecyclePage {

    recycleItem: RecycleItem
    lastImage: string = null;
    loading: Loading;
    errorMsg: string = "";
    user: User
    temporalName: string = ""
    isitemTypeName: boolean = false
    tip: Tip

    private showLoadingMsg: boolean = true

    itemTypeList: ItemType[] = []

    constructor(
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        private navCtrl: NavController,
        private camera: Camera,
        private transfer: Transfer,
        private actionSheetCtrl: ActionSheetController,
        private loadingCtrl: LoadingController,
        private geolocation: Geolocation,
        private locationAccuracy: LocationAccuracy,
        private alertCtrl: AlertController,
        private notificationProvider: NotificationProvider,
        private googleCloudServiceProvider: GoogleCloudServiceProvider,
        private utilsProvider: UtilsProvider,
        private sessionProvider: SessionProvider,
        private userProvider: UserProvider,
        private itemTypeProvider: ItemTypeProvider,
        private tipProvider: TipProvider,
        private fileProvider: FileProvider
    ) {

        this.getAllItems().then(res => {
            this.showLoadingMsg = false
        })

        this.getRandomTip()
    }

    public getAllItems() {
        var status: number

        return new Promise(resolve => {
            this.itemTypeProvider.getAllItemTypes().subscribe(res => {
                status = res.status
                if (status === 200) {
                    this.itemTypeList = res.json()
                    resolve(true)
                } else {
                    resolve(false)
                }
            }, error => {
                if (error.status == 404) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }

            })
        })
    }

    public getRandomTip() {
        var status: number
        return new Promise(resolve => {
            this.tipProvider.getRandomTip().subscribe(res => {
                status = res.status
                if (status === 200) {
                    this.tip = res.json()
                    resolve(true)
                } else {
                    resolve(false)
                }
            }, error => {
                if (error.status == 404) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }

            })
        })
    }

    public loadPositionSlide(itemType: ItemType) {
        this.recycleItem = new RecycleItem()
        this.recycleItem.itemType = itemType
        this.recycleItem.name = itemType.typeEs
        this.recycleItem.recycleUser = this.user.id
        this.isitemTypeName = true

        this.getUserPositionButton(); //directly without new button step
    }

    public getUserPositionButton() {
        this.loading = this.loadingCtrl.create({
            content: 'Obteniendo la ubicación del usuario...',
            enableBackdropDismiss: true
        });

        this.loading.present()
        this.getUserPosition()
    }

    public getUserPosition() {
        let myPosition: Position
        let GPSoptions = { timeout: this.config.defaultTimeoutTime, enableHighAccuracy: true, maximumAge: 100 };
        this.geolocation.getCurrentPosition(GPSoptions).then(position => {
            myPosition = new Position(-1, position.coords.latitude, position.coords.longitude)
            if (this.user.lastPosition != null) {
                myPosition.id = this.user.lastPosition.id
            }
            this.user.lastPosition = myPosition
            this.userProvider.saveUser(this.user, this.user.accessToken).subscribe(res => {
                this.goToMapPage(myPosition)
            }, error => { //saveUserPosition
                this.loading.dismiss()
                this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg);
            })

        }, (error: PositionError) => {
            this.loading.dismiss()
            if (error.code == 3) { //Timeout
                if (this.user.lastPosition != null) {
                    this.goToMapPage(this.user.lastPosition)
                }
                else {
                    this.notificationProvider.presentTopToast("Error, comprueba que la localización esté activada")
                }

            }
            else {
                this.notificationProvider.presentTopToast("Error obteniendo la ubicación")
            }

        })
    }




    public presentActionSheetActions() {
        this.sessionProvider.getSession().then(res => {
            this.user = res
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                (resp) => {
                    this.actionSheetMenuActions()
                }).catch((error) => {
                    if (this.config.DEBUG_MODE == true) {
                        this.actionSheetMenuActions()
                    }
                    else {
                        this.notificationProvider.presentTopToast('Error en la obtención de los permisos necesarios.');
                    }
                })
        }, err => {
            this.loading.dismiss()
            this.notificationProvider.presentTopToast('Error obteniendo los datos necesarios.')
        });
    }

    public takePicture(sourceType) {
        this.loading = this.loadingCtrl.create({
            content: 'Cargando...',
            enableBackdropDismiss: true
        });
        this.loading.present()

        this.fileProvider.takePicture(sourceType).then((res: string[]) => {
            this.processImage(res['base64Image'], res['imagePath'])
        }, error => {
            this.loading.dismiss()
            if (error != 'No Image Selected' && error.message != "User cancelled") {
                this.notificationProvider.presentTopToast('Error en la selección de la imagen.');
            }
        })
    }

    private actionSheetMenuActions() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Sube una foto de lo que desees reciclar',
            buttons: [
                {
                    text: 'Cargar foto de la galería',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Tomar una foto',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Reciclar por tipo de objeto',
                    handler: () => {
                        this.presentActionSheetTypeRecycle()
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }

    public presentActionSheetTypeRecycle() {

        let actionSheet = this.actionSheetCtrl.create({
            title: '¿Qué deseas reciclar?'
        });
        for (let i = 0; i < this.itemTypeList.length; i++) {
            actionSheet.addButton({
                text: this.itemTypeList[i].typeEs,
                handler: () => {
                    this.loadPositionSlide(this.itemTypeList[i]);
                }
            })
        }

        actionSheet.addButton({
            text: 'Cancelar',
            role: 'cancel'
        })
        actionSheet.present();

    }

    public processImage(base64Image, imagePath) {
        this.loading.setContent('Subiendo la imagen...')

        var date = new Date()
        var filename = this.user.id + "_" + date.getTime() + ".png";

        var url = this.config.uploadFilesUrl
        var urlUpload = url + "/upload.php"
        var urlUploadedFile = url + '/uploads/' + filename

        this.recycleItem = new RecycleItem()
        this.recycleItem.id = null
        this.recycleItem.image = urlUploadedFile
        this.recycleItem.recycleUser = this.user.id
        this.recycleItem.createdDate = new Date()



        this.fileProvider.uploadFile(imagePath, filename, urlUpload).then(res => {
            if (res == true) {
                this.loading.setContent('Obteniendo el tipo de objeto...')
                this.getItemInfo(base64Image)
            }
            else {
                this.loading.dismiss()
                this.notificationProvider.presentAlertError('La imagen no ha sido cargada correctamente.')
            }
        }, error => {
            this.loading.dismiss()
            this.notificationProvider.presentAlertError('Error de conexión con el servidor de imágenes.')
        })
    }

    public getItemInfo(base64Image) {
        this.googleCloudServiceProvider.getLabels(base64Image).timeout(this.config.defaultTimeoutTime).subscribe((result: any) => {

            var labelResponseList: LabelResponse[] = []
            labelResponseList = result.json().responses[0].labelAnnotations;
            if (labelResponseList == null || labelResponseList.length == 0) {
                labelResponseList = []
                var myLabelResponse = new LabelResponse("empty", 1)
                labelResponseList.push(myLabelResponse)
            }
            this.temporalName = labelResponseList[0].description

            this.getTypeFromDB(labelResponseList).subscribe((res: boolean) => {

                if (res == true) {
                    this.googleCloudServiceProvider.translateToSpanish(this.temporalName).subscribe(res => {
                        this.recycleItem.name = res.json().data.translations[0].translatedText
                        this.recycleItem.name = this.recycleItem.name.charAt(0).toUpperCase() + this.recycleItem.name.substr(1).toLowerCase()
                        this.loading.setContent("Obteniendo la ubicación del usuario...")
                        this.getUserPosition()
                    }, err => { // translate
                        this.loading.dismiss()
                        this.notificationProvider.presentTopToast("Error interno en la obtención del nombre.")
                    })
                }
                else {
                    this.loading.dismiss()
                }
            }, error => { // this.getTypeFromDB
                this.loading.dismiss()
                this.notificationProvider.presentTopToast("Error obteniendo el tipo de objeto")
            })
        }, err => { // Vision
            this.loading.dismiss()
            this.notificationProvider.presentTopToast("Error a la hora de utilizar la imagen.")
        })
    }

    public getTypeFromDB(labelResponseList): Observable<boolean> {
        return this.itemTypeProvider.getRecycleItemItemTypeBylabelAnnotations(labelResponseList).map(res => {
            this.temporalName = res.json().description
            this.recycleItem.itemType = res.json().itemType
            return true
        }).catch(error => {
            return Observable.fromPromise(this.showRadioModifyItemType()).flatMap(res => {
                return Observable.of(res)
            })
        })
    }

    showRadioModifyItemType(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            var alert = this.alertCtrl.create({
                title: '<span style="font-size:10px">No se ha encontrado ningún tipo, por favor, selecciona uno</span>',
                buttons: [
                    {
                        text: 'Cambiar tipo',
                        handler: (data) => {
                            this.recycleItem.itemType = this.itemTypeList[data]
                            resolve(true)
                        }
                    }
                ]
            })
            for (let i = 0; i < this.itemTypeList.length; i++) {
                alert.addInput({
                    type: 'radio',
                    value: i.toString(),
                    label: this.itemTypeList[i].typeEs,
                });
            }
            alert.present();
        })
    }



    goToMapPage(myPosition: Position) {
        this.utilsProvider.getNearestStoragePointByItemType(myPosition, this.recycleItem.itemType.id).timeout(this.config.defaultTimeoutTime).subscribe(
            result => {
                this.recycleItem.storage = result.storagePoint
                if (result.status == 200) {

                    this.navCtrl.push(MapPage, {
                        isitemTypeName: this.isitemTypeName, // false => If take photo/library || true => recycleByItemType
                        recycleItem: this.recycleItem,
                        myPosition: myPosition,
                        itemTypeList: this.itemTypeList
                    })
                    this.loading.dismiss()
                }
                else {
                    this.loading.dismiss()
                    this.notificationProvider.presentTopToast('No hay ningún punto de reciclaje cercano.');
                }
            },
            error => { // Error undefined desde cordova browser /itemType/undefined/storagePoints
                this.loading.dismiss()
                this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg)
            })
    }

    doRefresh(refresher: any) {
        this.getRandomTip()

        this.getAllItems().then((res: boolean) => {
            refresher.complete();
        });
    }

}
