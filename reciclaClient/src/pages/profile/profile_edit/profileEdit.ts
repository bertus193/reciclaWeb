import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActionSheetController, Loading, LoadingController, NavParams, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NotificationProvider } from '../../../providers/notifications';
import { Crop } from '@ionic-native/crop';
import { User } from '../../../models/user';
import { UserProvider } from '../../../providers/api/userProvider';
import { APP_CONFIG_TOKEN, ApplicationConfig } from '../../../app/app-config';
import { FileUploadOptions, TransferObject, Transfer } from '@ionic-native/transfer';

@Component({
    selector: 'page-profileEdit',
    templateUrl: 'profileEdit.html'
})
export class ProfileEditPage {

    profileEditForm: FormGroup
    defaultPage: string = 'profileEdit'
    loading: Loading
    image: string = ''
    user: User

    constructor(
        @Inject(APP_CONFIG_TOKEN) private config: ApplicationConfig,
        private formBuilder: FormBuilder,
        private actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        private loadingCtrl: LoadingController,
        private notificationProvider: NotificationProvider,
        private crop: Crop,
        private navParams: NavParams,
        private userProvider: UserProvider,
        private navCtrl: NavController,
        private transfer: Transfer
    ) {
        this.profileEditForm = this.formBuilder.group({
            email: [''],
            fullName: ['']
        }, {});

        this.user = this.navParams.get('user')
        this.image = this.user.profilePicture
    }

    public editProfile_Button() {

        var email: string = this.profileEditForm.get("email").value
        var fullName: string = this.profileEditForm.get("fullName").value

        if (this.user.email != email || this.user.fullName != fullName || this.user.profilePicture != this.image) {
            this.loading = this.loadingCtrl.create({
                content: 'Guardando usuario...'
            });
            this.loading.present()


            this.user.email = email
            this.user.fullName = fullName
            if (this.image != this.user.profilePicture) {
                this.user.profilePicture = this.image

                this.uploadImage(this.image).then(urlUploadedFiles => {
                    this.image = urlUploadedFiles
                    this.user.profilePicture = urlUploadedFiles
                    this.userProvider.saveUser(this.user, this.user.accessToken).subscribe(res => {
                        this.notificationProvider.presentTopToast("El usuario se ha guardado correctamente!")
                        this.loading.dismiss()
                        this.navCtrl.pop()
                    })
                }).catch(error => {
                    this.loading.dismiss()
                    this.notificationProvider.presentTopToast("Error al guardar el usuario")
                })
            }
            else {
                this.userProvider.saveUser(this.user, this.user.accessToken).subscribe(res => {
                    this.notificationProvider.presentTopToast("El usuario se ha guardado correctamente!")
                    this.loading.dismiss()
                    this.navCtrl.pop()
                }, error => {
                    this.loading.dismiss()
                    this.notificationProvider.presentTopToast("Error al guardar el usuario")
                })
            }
        }
        else {
            this.navCtrl.pop()
        }

    }


    public editProfilePicture() {
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
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
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
            this.crop.crop(fileUri, { quality: 100, targetWidth: 650, targetHeight: 650 }).then((image) => {
                this.image = image
                this.loading.dismiss()
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

    public uploadImage(targetPath) {

        var date = new Date()
        var filename = this.user.id + "_" + date.getTime() + ".png";

        var url = this.config.uploadFilesUrl
        var urlUpload = url + "/upload-avatar.php"
        var urlUploadedFiles = url + '/uploads/avatars/' + filename


        var options: FileUploadOptions = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': filename }
        };

        const fileTransfer: TransferObject = this.transfer.create();

        return fileTransfer.upload(targetPath, urlUpload, options).then(data => {
            return urlUploadedFiles
        })

    }
}
