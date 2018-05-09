import { Injectable, Inject } from '@angular/core';
import { TimeoutError } from 'rxjs/Rx'
import { CameraOptions, Camera } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';
import { Crop } from '@ionic-native/crop';
import { FileUploadOptions, TransferObject, Transfer } from '@ionic-native/transfer';
import { APP_CONFIG_TOKEN, ApplicationConfig } from '../app/app-config';


@Injectable()
export class FileProvider {

    public recycleItemImagesFolder: string = "/uploads/"
    public avatarsFolder: string = "/uploads/avatars/"

    constructor(
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        private camera: Camera,
        private platform: Platform,
        private crop: Crop,
        private transfer: Transfer
    ) { }

    toBase64(url: string) {
        return new Promise<string>(function (resolve) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    resolve(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.send();
        });
    }

    public takePicture(sourceType) {
        return new Promise((resolve, reject) => {

            var options: CameraOptions = {
                quality: 100,
                sourceType: sourceType,
                saveToPhotoAlbum: false,
                correctOrientation: true,
                targetWidth: 900,
                targetHeight: 900,
                encodingType: this.camera.EncodingType.PNG,
                mediaType: this.camera.MediaType.PICTURE,
                destinationType: this.camera.DestinationType.FILE_URI // Return image file URI
            };

            // Get the data of an image 
            this.camera.getPicture(options).then((imageUri) => {
                if (this.platform.is('android')) {
                    imageUri = 'file://' + imageUri
                }
                this.crop.crop(imageUri, { quality: 100, targetWidth: 650, targetHeight: 650 }).then((imagePath) => {
                    this.toBase64(imagePath).then(base64Image => {
                        base64Image = base64Image.substring(base64Image.indexOf(',') + 1)
                        var resArray: string[] = []
                        resArray['base64Image'] = base64Image
                        resArray['imagePath'] = imagePath
                        resolve(resArray)
                    })
                }, error => { //crop.crop
                    reject(error)
                })
            }).catch(error => { //camera.GetPicture
                reject(error)
            });
        })
    }

    public uploadFile(imagePath: string, fileName: string, urlUploadScript: string) {
        return new Promise((resolve, reject) => {
            var options: FileUploadOptions = {
                fileKey: "file",
                fileName: fileName,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params: { 'fileName': fileName }
            };

            const fileTransfer: TransferObject = this.transfer.create();

            this.uploadFileWithTimeout(fileTransfer, imagePath, urlUploadScript, options).then(res => {
                if (res == true) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    uploadFileWithTimeout(fileTransfer: TransferObject, targetPath, urlUpload, options): Promise<boolean> {
        return this.timeoutPromise(this.config.defaultTimeoutTime + 5000,
            fileTransfer.upload(targetPath, urlUpload, options).then(data => {
                return true
            }, error => {
                return false
            })
        )
    }

    public timeoutPromise(timeout, promise) {
        var wrapPromise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new TimeoutError());
            }, timeout);
        });

        return Promise.race([promise, wrapPromise]);
    }

    convertToDataURLviaCanvas(url, outputFormat) {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
                    ctx = canvas.getContext('2d'),
                    dataURL;
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);
                dataURL = canvas.toDataURL(outputFormat);
                resolve(dataURL);
                canvas = null;
            };
            img.src = url;
        });
    }
}