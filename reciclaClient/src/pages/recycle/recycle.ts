import { Component, Inject } from '@angular/core';
import { NavController, LoadingController, ActionSheetController, Loading, AlertController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
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
import { TypeRecycle, TypeRecycle_EN } from '../../models/typeRecicle';
import { UtilsProvider } from '../../providers/utils';
import { UserProvider } from '../../providers/api/userProvider';

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
        private crop: Crop
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
            this.user.lastPosition = position
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
                    this.notificationProvider.presentTopToast("Error: " + error.message)
                }

            }
            else {
                this.notificationProvider.presentTopToast("Error obteniendo la ubicación")
            }

        })
    }


    public takePicture(sourceType) {
        this.loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });
        this.loading.present()

        var options: CameraOptions = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            targetWidth: 900,
            targetHeight: 900,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE
        };

        // Get the data of an image 
        this.camera.getPicture(options).then((imagePath) => {
            var fileUri = 'file://' + imagePath;
            //var image = `data:image/png;base64,${imagePath}`; //load image on view
            this.crop.crop(fileUri, { quality: 100, targetWidth: 650, targetHeight: 650 }).then((image) => {
                this.uploadImage(image)
            }, error => { //crop.crop
                this.loading.dismiss()
                if (error.message != "User cancelled") {
                    this.notificationProvider.presentTopToast('Error en la selección de la imagen.');
                }
            })
        }).catch(error => { //camera.GetPicture
            this.loading.dismiss()
            if (error != 'No Image Selected') {
                this.notificationProvider.presentTopToast('Error en la selección de la imagen.');
            }

        });
    }

    public presentActionSheetActions() {
        this.sessionProvider.getSession().then((user: User) => {
            this.user = user
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
        this.loading.setContent('Subiendo la imagen...')

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

        this.upload(targetPath, urlUpload, options, fileTransfer, urlUploadedFiles).catch(error => {
            this.loading.dismiss()
            this.notificationProvider.presentAlertError('Error de conexión con el servidor de imágenes.')
        })

    }

    public getTypeFromDB(labelResponseList): Observable<boolean> {
        return this.googleCloudServiceProvider.getLabelAnnotations(labelResponseList).map(res => {
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
        return this.utilsProvider.timeoutPromise(this.config.defaultTimeoutTime,
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
                    }

                }, err => { // Vision
                    this.loading.dismiss()
                    this.notificationProvider.presentTopToast("Error a la hora de utilizar la imagen.")
                })

            }, err => { //upload
                this.loading.dismiss()
                this.notificationProvider.presentTopToast("Error a la hora de subir la imagen.")
            })
        )

        /*
        catch(error => { // fileTransfer.upload
            this.loading.dismiss()
            this.notificationProvider.presentTopToast('Error de conexión con el servidor de imágenes.')
        }
        */
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
                        isitemTypeName: this.isitemTypeName, // false => If take photo/library || true => recycleByItemType
                        recycleItem: this.recycleItem,
                        myPosition: myPosition
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
