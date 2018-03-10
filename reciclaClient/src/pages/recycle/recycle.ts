import { Component, ViewChild, Inject } from '@angular/core';
import { NavController, LoadingController, ActionSheetController, Platform, Loading, Slides } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../app/app-config';
import { StoragePoint } from '../../models/storagePoint'

import { Http } from '@angular/http';
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
import { TypeRecycle } from '../../models/typeRecicle';

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

    @ViewChild(Slides) slides: Slides;

    constructor(
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        public navCtrl: NavController,
        private camera: Camera,
        private transfer: Transfer,
        public actionSheetCtrl: ActionSheetController,
        public platform: Platform,
        public loadingCtrl: LoadingController,
        private geolocation: Geolocation,
        private locationAccuracy: LocationAccuracy,
        private http: Http,
        private notificationProvider: NotificationProvider,
        private googleCloudServiceProvider: GoogleCloudServiceProvider,
        private sessionProvider: SessionProvider
    ) {
        this.recycleItem = new RecycleItem();
    }

    ionViewDidLoad() {
        if (this.platform.is('cordova') && !this.config.DEBUG_MODE) {
            this.slides.lockSwipes(true);
        }
    }

    public loadPositionSlide(recycleItemType: number) {
        this.sessionProvider.getSession
        this.recycleItem.id = null
        this.recycleItem.image = this.config.defaultImageDirectory
        this.recycleItem.itemType = recycleItemType
        this.recycleItem.name = TypeRecycle[this.recycleItem.itemType]
        this.recycleItem.recycleUser = this.user.id
        this.recycleItem.createdDate = new Date()

        this.recycleItem.itemType = recycleItemType
        this.slideNext();
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
        let GPSoptions = { timeout: this.config.defaultTimeoutTime, enableHighAccuracy: true, maximumAge: 0 };
        this.geolocation.getCurrentPosition(GPSoptions).then(position => {
            myPosition = new Position(position.coords.latitude, position.coords.longitude)

            this.getNearestStoragePoint(myPosition).timeout(this.config.defaultTimeoutTime).subscribe(
                result => {
                    this.loading.dismissAll()
                    this.recycleItem.storage = result.storagePoint
                    if (result.status == 200) {

                        this.navCtrl.push(MapPage, {
                            recycleItem: this.recycleItem,
                            myPosition: myPosition,
                        })
                    }
                    else {
                        this.loading.dismissAll()
                        this.notificationProvider.presentTopToast('No hay ningún punto de reciclaje cercano.');
                    }
                },
                error => {
                    this.loading.dismissAll()
                    this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg)
                })
        }).catch(error => {
            this.loading.dismissAll()
            this.notificationProvider.presentTopToast("Error obteniendo la ubicación")
        })
    }


    public takePicture(sourceType) {

        var options: CameraOptions = {
            quality: 20,
            targetWidth: 350,
            targetHeight: 350,
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
            this.notificationProvider.presentTopToast('Error en la selección de la imagen.');
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
                                text: 'Cargar de la librería',
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


    private slideNext() {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    }

    private slidePrev() {
        this.slides.lockSwipes(false);
        this.slides.slidePrev();
        this.slides.lockSwipes(true);
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
        this.recycleItem.itemType = Math.floor(Math.random() * (5 - 1)) + 1; //TODO
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

        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, urlUpload, options).then(data => {
            this.googleCloudServiceProvider.getLabels(urlUploadedFiles).timeout(this.config.defaultTimeoutTime).subscribe((result: any) => {
                var labelResponseList: LabelResponse[];
                labelResponseList = result.json().responses[0].labelAnnotations;
                if (labelResponseList.length > 0) {
                    //TODO FIND BY NAME labelResponseList[0].description
                    this.googleCloudServiceProvider.translateToSpanish(labelResponseList[0].description).subscribe(res => {
                        this.recycleItem.name = res.json().data.translations[0].translatedText
                        this.loading.setContent("Obteniendo la ubicación del usuario...")
                        this.getUserPosition()
                    }, err => { // translate
                        this.loading.dismissAll()
                        this.notificationProvider.presentTopToast("Error interno en la obtención del nombre.")
                    })
                }

            }, err => { // Vision
                this.loading.dismissAll()
                this.notificationProvider.presentTopToast("Error a la hora de utilizar la imagen.")
            })

        }, err => { // uploadFile
            this.loading.dismissAll()
            this.notificationProvider.presentTopToast('Error while uploading file.')
        });

    }

    public getNearestStoragePoint(currentPosition: Position): Observable<{ storagePoint: StoragePoint, status: number }> {
        var status: number
        var storagePointList: StoragePoint[]
        var storagePoint: StoragePoint
        return this.http.get(this.config.apiEndpoint + "/storagePoints").map(res => {
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
            console.log(error)
            return Observable.throw(error);
        });
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
