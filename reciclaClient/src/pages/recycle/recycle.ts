import { Component, ViewChild, Inject } from '@angular/core';
import { NavController, LoadingController, ActionSheetController, Platform, Loading, Slides } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
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
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service';
import { SessionProvider } from '../../providers/session';
import { User } from '../../models/user';

declare var cordova: any;

@Component({
    selector: 'page-recycle',
    templateUrl: 'recycle.html'
})
export class RecyclePage {

    lastImage: string = null;
    loading: Loading;
    errorMsg: string = "";

    recycleItemType: number;

    @ViewChild(Slides) slides: Slides;

    constructor(
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        public navCtrl: NavController,
        private camera: Camera,
        private transfer: Transfer,
        private file: File,
        private filePath: FilePath,
        public actionSheetCtrl: ActionSheetController,
        public platform: Platform,
        public loadingCtrl: LoadingController,
        private geolocation: Geolocation,
        private locationAccuracy: LocationAccuracy,
        private http: Http,
        private notificationProvider: NotificationProvider,
        private vision: GoogleCloudVisionServiceProvider,
        private sessionProvider: SessionProvider
    ) {

    }

    ionViewDidLoad() {
        if (this.platform.is('cordova') && !this.config.DEBUG_MODE) {
            this.slides.lockSwipes(true);
        }
    }

    public test() {
        this.navCtrl.push(MapPage, {
            recycleItemType: this.recycleItemType,
            myPosition: null,
            storagePoint: null
        })
    }

    public loadPositionSlide(recycleItemType: number) {
        this.recycleItemType = recycleItemType
        this.slideNext();
    }

    public getUserPosition() {

        let myPosition: Position

        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            (resp) => {
                this.geolocation.getCurrentPosition().then(position => {

                    myPosition = new Position(position.coords.latitude, position.coords.longitude)

                    this.getNearestStoragePoint(myPosition).timeout(this.config.defaultTimeoutTime).subscribe(
                        result => {
                            var storagePoint: StoragePoint = result.storagePoint
                            if (result.status == 200) {

                                this.navCtrl.push(MapPage, {
                                    recycleItemType: this.recycleItemType,
                                    myPosition: myPosition,
                                    storagePoint: storagePoint
                                })
                            }
                            else {
                                this.notificationProvider.presentTopToast('No hay ningún punto de reciclaje cercano.');
                            }
                        },
                        error => {
                            this.notificationProvider.presentTopToast(this.config.defaultTimeoutMsg)
                        })
                })
            }).catch((error) => {
                this.notificationProvider.presentTopToast('Error en la obtención de los permisos necesarios.');
            })
    }


    public takePicture(sourceType) {

        var options: CameraOptions = {
            quality: 20,
            targetWidth: 600,
            targetHeight: 600,
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

    public presentActionSheet() {

        let actionSheet = this.actionSheetCtrl.create({
            title: 'Elige un tipo de material',
            buttons: [
                {
                    text: 'Cargar de la librería',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Usar Cámara',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Orgánico',
                    handler: () => {
                        this.loadPositionSlide(1);
                    }
                },
                {
                    text: 'Plástico',
                    handler: () => {
                        this.loadPositionSlide(2);
                    }
                },
                {
                    text: 'Cristal',
                    handler: () => {
                        this.loadPositionSlide(3);
                    }
                },
                {
                    text: 'Papel',
                    handler: () => {
                        this.loadPositionSlide(4);
                    }
                },
                {
                    text: 'Material de oficina',
                    handler: () => {
                        this.loadPositionSlide(5);
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

        this.sessionProvider.getSession().then((user: User) => {

            var date = new Date()
            var filename = user.id + "_" + date.getTime() + ".png";

            var url = "https://reciclaweb.000webhostapp.com"
            var urlUpload = url + "/upload.php"
            var urlUploadedFiles = url + '/uploads/' + filename

            var options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params: { 'fileName': filename }
            };

            const fileTransfer: TransferObject = this.transfer.create();

            this.loading = this.loadingCtrl.create({
                content: 'Subiendo imagen...'
            });
            this.loading.present()

            // Use the FileTransfer to upload the image
            fileTransfer.upload(targetPath, urlUpload, options).then(data => {

                this.vision.getLabels(urlUploadedFiles).subscribe((result: any) => {
                    this.loading.dismissAll()
                    this.notificationProvider.presentAlertOk(urlUploadedFiles + " @@ " + JSON.stringify(result))
                    this.slideNext()
                }, err => { //Vision.getLabels
                    this.notificationProvider.presentAlertError("Error a la hora de utilizar la imagen.")
                })

            }, err => {
                this.loading.dismissAll()
                this.notificationProvider.presentTopToast('Error while uploading file.')
            });
        }, err => {
            this.loading.dismissAll()
            this.notificationProvider.presentTopToast('Error obteniendo los datos necesarios.')
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
