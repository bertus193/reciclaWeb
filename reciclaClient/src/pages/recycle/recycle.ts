import { Component, Inject } from '@angular/core';
import { NavController, LoadingController, ActionSheetController, Loading, AlertController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../app/app-config';

import { Http, RequestOptions, Headers } from '@angular/http';
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
import { TypeRecycle, TypeRecycle_EN } from '../../models/typeRecicle';
import { UtilsProvider } from '../../providers/utils';

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

    constructor(
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        private navCtrl: NavController,
        private camera: Camera,
        private transfer: Transfer,
        private actionSheetCtrl: ActionSheetController,
        private loadingCtrl: LoadingController,
        private geolocation: Geolocation,
        private locationAccuracy: LocationAccuracy,
        private http: Http,
        private alertCtrl: AlertController,
        private notificationProvider: NotificationProvider,
        private googleCloudServiceProvider: GoogleCloudServiceProvider,
        private utilsProvider: UtilsProvider,
        private sessionProvider: SessionProvider
    ) {
        this.recycleItem = new RecycleItem();
    }

    ionViewDidLoad() {
    }

    public loadPositionSlide(recycleItemType: number) {
        this.sessionProvider.getSession
        this.recycleItem.id = null
        this.recycleItem.image = this.config.defaultImageDirectory
        this.recycleItem.itemType = recycleItemType
        this.recycleItem.name = TypeRecycle[this.recycleItem.itemType]
        this.recycleItem.recycleUser = this.user.id
        this.recycleItem.createdDate = new Date()
        this.getUserPositionButton(); //directly without new button step
    }

    public getUserPositionButton() {
        this.loading = this.loadingCtrl.create({
            content: 'Obteniendo la ubicación del usuario...'
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
            this.saveUserPosition(this.user, myPosition).subscribe(res => {
                this.goToMapPage(myPosition)
            }, error => { //saveUserPosition
                this.loading.dismissAll()
                this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg);
            })

        }, (error: PositionError) => {
            this.loading.dismissAll()
            if (error.code == 3) { //Timeout
                if (this.user.lastPosition != null) {
                    this.goToMapPage(this.user.lastPosition)
                }
                else {
                    this.notificationProvider.presentTopToast("Error: " + error.message)
                }

            }
            else {
                this.notificationProvider.presentTopToast("Error obteniendo la ubicación")
            }

        })
    }


    public takePicture(sourceType) {

        var options: CameraOptions = {
            quality: 20,
            targetWidth: 450,
            targetHeight: 450,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE
        };

        // Get the data of an image 
        this.camera.getPicture(options).then((imagePath) => {
            //var image = `data:image/png;base64,${imagePath}`;
            this.uploadImage(imagePath)
        }, (err) => { //camera.GetPicture
            if (err != 'No Image Selected') {
                this.notificationProvider.presentTopToast('Error en la selección de la imagen.');
            }

        });
    }

    public presentActionSheetActions() {
        this.sessionProvider.getSession().then((user: User) => {
            this.user = user
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                (resp) => {
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
                }).catch((error) => {
                    this.notificationProvider.presentTopToast('Error en la obtención de los permisos necesarios.');
                })
        }, err => {
            this.loading.dismissAll()
            this.notificationProvider.presentTopToast('Error obteniendo los datos necesarios.')
        });
    }
    public presentActionSheetTypeRecycle() {
        var typeRecycle: number;

        let actionSheet = this.actionSheetCtrl.create({
            title: '¿Qué deseas reciclar?',
            buttons: [
                {
                    text: 'Orgánico',
                    handler: () => {
                        typeRecycle = 1
                        this.loadPositionSlide(typeRecycle);
                    }
                },
                {
                    text: 'Plástico',
                    handler: () => {
                        typeRecycle = 2
                        this.loadPositionSlide(typeRecycle);
                    }
                },
                {
                    text: 'Cristal',
                    handler: () => {
                        typeRecycle = 3
                        this.loadPositionSlide(typeRecycle);
                    }
                },
                {
                    text: 'Papel',
                    handler: () => {
                        typeRecycle = 4
                        this.loadPositionSlide(typeRecycle);
                    }
                },
                {
                    text: 'Material de oficina',
                    handler: () => {
                        typeRecycle = 5
                        this.loadPositionSlide(typeRecycle);
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

    public uploadImage(targetPath) {
        var date = new Date()
        var filename = this.user.id + "_" + date.getTime() + ".png";

        var url = this.config.uploadFilesUrl
        var urlUpload = url + "/upload.php"
        var urlUploadedFiles = url + '/uploads/' + filename

        this.recycleItem.id = null
        this.recycleItem.image = urlUploadedFiles
        this.recycleItem.name = TypeRecycle[this.recycleItem.itemType]
        this.recycleItem.recycleUser = this.user.id
        this.recycleItem.createdDate = new Date()


        var options: FileUploadOptions = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': filename }
        };

        const fileTransfer: TransferObject = this.transfer.create();

        this.loading = this.loadingCtrl.create({
            content: 'Subiendo la imagen...'
        });
        this.loading.present()

        this.upload(targetPath, urlUpload, options, fileTransfer, urlUploadedFiles)

    }

    public getTypeFromDB(labelResponseList): Observable<boolean> {
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        return this.http.post(this.config.apiEndpoint + '/itemTypeName/labelAnnotations', JSON.stringify(labelResponseList), options).timeout(this.config.defaultTimeoutTime).map(res => {
            this.temporalName = res.json().description
            this.recycleItem.itemType = this.getItemType(res.json().itemType.type, 'EN')
            return true
        }).catch(error => {
            return Observable.fromPromise(this.showRadioModifyItemType()).flatMap(res => {
                return Observable.of(res)
            })
        })
    }

    public upload(targetPath, urlUpload, options, fileTransfer, urlUploadedFiles) {
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, urlUpload, options).then(data => {
            this.googleCloudServiceProvider.getLabels(urlUploadedFiles).timeout(this.config.defaultTimeoutTime).subscribe((result: any) => {
                var labelResponseList: LabelResponse[];
                labelResponseList = result.json().responses[0].labelAnnotations;
                if (labelResponseList.length > 0) {
                    this.temporalName = labelResponseList[0].description

                    this.getTypeFromDB(labelResponseList).subscribe((res: boolean) => {
                        if (res == true) {
                            this.googleCloudServiceProvider.translateToSpanish(this.temporalName).subscribe(res => {
                                this.recycleItem.name = res.json().data.translations[0].translatedText
                                this.recycleItem.name = this.recycleItem.name.charAt(0).toUpperCase() + this.recycleItem.name.substr(1).toLowerCase()
                                this.loading.setContent("Obteniendo la ubicación del usuario...")
                                this.getUserPosition()
                            }, err => { // translate
                                this.loading.dismissAll()
                                this.notificationProvider.presentTopToast("Error interno en la obtención del nombre.")
                            })
                        }
                        else {
                            this.loading.dismissAll()
                        }
                    }, error => {
                        this.loading.dismissAll()
                        this.notificationProvider.presentTopToast("Error obteniendo el tipo de objeto")
                    })
                }

            }, err => { // Vision
                this.loading.dismissAll()
                this.notificationProvider.presentTopToast("Error a la hora de utilizar la imagen.")
            })

        }, err => { // uploadFile
            this.loading.dismissAll()
            this.notificationProvider.presentTopToast('Error en el procesado de la imagen.')
        });
    }

    showRadioModifyItemType(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            var alert = this.alertCtrl.create({
                title: '<span style="font-size:10px">No se ha encontrado ningún tipo, por favor, selecciona uno</span>',
                buttons: [
                    {
                        text: 'Cambiar tipo',
                        handler: (data) => {
                            this.recycleItem.itemType = this.getItemType(data)
                            resolve(true)
                        }
                    }
                ]
            })
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
            alert.present();
        })
    }



    goToMapPage(myPosition: Position) {
        this.utilsProvider.getNearestStoragePointByItemType(myPosition, this.recycleItem.itemType).timeout(this.config.defaultTimeoutTime).subscribe(
            result => {
                this.recycleItem.storage = result.storagePoint
                if (result.status == 200) {

                    this.navCtrl.push(MapPage, {
                        recycleItem: this.recycleItem,
                        myPosition: myPosition
                    })
                    this.loading.dismissAll()
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

    public saveUserPosition(user: User, position: Position) {
        user.recycleItems = null
        user.lastPosition = position
        this.sessionProvider.updateSession(user)
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        return this.http.put(this.config.apiEndpoint + "/users/private/" + user.id + "?token=" + user.accessToken, JSON.stringify(user), options).timeout(this.config.defaultTimeoutTime);
    }

    public getItemType(itemTypeId: (number | string), lang = 'ES'): (number | string) {
        var out: string = "Desconocido"
        if (lang == 'ES') {
            if (TypeRecycle[itemTypeId]) {
                out = TypeRecycle[itemTypeId]
            }
        }
        else if (lang == 'EN') {
            if (TypeRecycle_EN[itemTypeId]) {
                out = TypeRecycle_EN[itemTypeId]
            }
        }

        return out
    }

}
