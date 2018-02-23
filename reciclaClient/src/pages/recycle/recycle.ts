import { Component, ViewChild, Inject } from '@angular/core';
import { NavController, LoadingController, ActionSheetController, ToastController, Platform, Loading, Slides } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { TypeRecycle } from '../../models/typeRecicle';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { ApplicationConfig, APP_CONFIG_TOKEN } from '../../app/app-config';

import { StoragePoint } from '../../models/storagePoint'
import { Http } from '@angular/http';
import { Position } from '../../models/position';

import { Observable } from 'rxjs/Rx'
import { recycleFinishPage } from '../recycleFinish/recycleFinish';



declare var cordova: any;

@Component({
    selector: 'page-recycle',
    templateUrl: 'recycle.html'
})
export class RecyclePage {

    image: string = null;
    lastImage: string = null;
    loading: Loading;
    errorMsg: string = "";

    typeRecycleItem: string;

    @ViewChild(Slides) slides: Slides;

    constructor(
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        public navCtrl: NavController,
        private camera: Camera,
        private transfer: Transfer,
        private file: File,
        private filePath: FilePath,
        public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController,
        public platform: Platform,
        public loadingCtrl: LoadingController,
        private geolocation: Geolocation,
        private locationAccuracy: LocationAccuracy,
        private http: Http
    ) {

    }

    ionViewDidLoad() {
        if (this.platform.is('cordova') && !this.config.DEBUG_MODE) {
            this.slides.lockSwipes(true);
        }
    }

    public loadPositionSlide(typeRecicleItem) {
        this.typeRecycleItem = TypeRecycle[typeRecicleItem]
        this.slideNext();
    }

    public getUserPosition() {

        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            (resp) => {
                this.geolocation.getCurrentPosition().then((position) => {
                    let myPosition: Position
                    myPosition.latitude = position.coords.latitude
                    myPosition.longitude = position.coords.longitude
                    this.getNearestStoragePoint(myPosition).map(
                        result => {
                            if (result.status == 200) {
                                var mapWindow;
                                if (this.platform.is('ios')) {
                                    mapWindow = window.open('maps://?q=Yo&saddr=' + position.coords.latitude + ',' + position.coords.longitude + '&daddr=' + result.storagePoint.position.latitude + ',' + result.storagePoint.position.longitude, '_system');
                                }
                                // android
                                else if (this.platform.is('android')) {
                                    mapWindow = window.open('geo://' + result.storagePoint.position.latitude + ',' + result.storagePoint.position.longitude + 'q=' + position.coords.latitude + ',' + position.coords.longitude + '(Yo)', '_system');
                                }
                                if (mapWindow) {
                                    this.navCtrl.push(recycleFinishPage, {
                                        typeRecicleItem: this.typeRecycleItem,
                                        storageId: result.storagePoint.id,
                                        recycleValue: 1
                                    })
                                }
                            } else {
                                return null
                            }
                        })
                }).catch((error) => {
                    this.presentToast('Error en la obtención de la ubicación.');
                    console.log('Error getting location', error);
                });
            }).catch((error) => {
                this.presentToast('Error en la obtención de los permisos necesarios.');
            })

    }



    public takePicture(sourceType) {

        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
            //this.image = `data:image/jpeg;base64,${imagePath}`;
            // Special handling for Android library
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
            } else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
            this.slideNext();
        }, (err) => {
            this.presentToast('Error en la selección de la imagen.');
        });
    }

    public presentActionSheet() {

        let actionSheet = this.actionSheetCtrl.create({
            title: 'Elige un tipo de material',
            buttons: [
                /*
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
                },*/
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

    private createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName = n + ".png";
        return newFileName;
    }

    // Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            this.lastImage = newFileName;
        }, error => {
            this.errorMsg = error;
            this.presentToast('Error en el almacenamiento de la imagen.');
        });
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    // Always get the accurate path to your apps folder
    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }

    public uploadImage() {
        // Destination URL
        var url = "https://reciclaweb.000webhostapp.com/upload.php";

        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);

        // File name only
        var filename = this.lastImage;

        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': filename }
        };

        const fileTransfer: TransferObject = this.transfer.create();

        this.loading = this.loadingCtrl.create({
            content: 'Uploading...',
        });
        this.loading.present();

        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(data => {
            this.loading.dismissAll()
            this.presentToast('Image succesful uploaded.');
        }, err => {
            this.loading.dismissAll()
            this.presentToast('Error while uploading file.');
        });
    }

    public getNearestStoragePoint(currentPosition: Position): Observable<{ storagePoint: StoragePoint, status: number }> {
        var status: number
        var storagePointList: StoragePoint[]
        var nearestStoragePoint: StoragePoint
        return this.http.get(this.config.apiEndpoint + "/storagePoints").map(res => {
            status = res.status

            if (status === 200) {
                storagePointList = res.json();
                nearestStoragePoint = storagePointList[0];
                for (let storagePoint of storagePointList) {
                    if ((currentPosition.latitude - storagePoint.position.latitude) < (currentPosition.latitude - nearestStoragePoint.position.latitude)) {
                        if ((currentPosition.longitude - storagePoint.position.longitude) < (currentPosition.longitude - nearestStoragePoint.position.longitude)) {
                            nearestStoragePoint = storagePoint
                        }
                    }
                }
            }
            return { nearestStoragePoint, status }
        }).catch(error => {
            return Observable.throw(error);
        });

    }

}
