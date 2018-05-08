import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ActionSheetController, Loading, LoadingController, NavParams, NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { NotificationProvider } from '../../../providers/notifications';
import { Crop } from '@ionic-native/crop';
import { User } from '../../../models/user';
import { UserProvider } from '../../../providers/api/userProvider';
import { APP_CONFIG_TOKEN, ApplicationConfig } from '../../../app/app-config';
import { FileUploadOptions, TransferObject, Transfer } from '@ionic-native/transfer';
import { FileProvider } from '../../../providers/fileProvider';

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
        private navParams: NavParams,
        private userProvider: UserProvider,
        private navCtrl: NavController,
        private transfer: Transfer,
        private fileProvider: FileProvider
    ) {
        this.user = this.navParams.get('user')
        this.image = this.user.profilePicture

        this.profileEditForm = this.formBuilder.group({
            email: [this.user.email],
            fullName: [this.user.fullName]
        }, {
                validator: ProfileEditPage.EmailIsValid
            });

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

                this.uploadImage(this.image).then((res: string) => {
                    this.image = res
                    this.user.profilePicture = res
                    this.userProvider.saveUser(this.user, this.user.accessToken).subscribe(res => {
                        this.notificationProvider.presentTopToast("El usuario se ha guardado correctamente!")
                        this.loading.dismiss()
                        this.navCtrl.pop()
                    }, error => {
                        this.notificationProvider.presentTopToast("Error a la hora de guardar el usuario")
                        this.loading.dismiss()
                    })
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

        this.fileProvider.takePicture(sourceType).then((res: string[]) => {
            this.image = res['imagePath']
            this.loading.dismiss()
        }, error => {
            this.loading.dismiss()
            if (error != 'No Image Selected' && error.message != "User cancelled") {
                this.notificationProvider.presentTopToast('Error en la selección de la imagen.');
            }
        })
    }

    public uploadImage(targetPath) {

        var date = new Date()
        var filename = this.user.id + "_" + date.getTime() + ".png";

        var url = this.config.uploadFilesUrl
        var urlUpload = url + "/upload-avatar.php"
        var urlUploadedFiles = url + '/uploads/avatars/' + filename

        return new Promise((resolve, reject) => {
            this.fileProvider.uploadFile(targetPath, filename, urlUpload).then(res => {
                if (res == true) {
                    resolve(urlUploadedFiles)
                }
                else {
                    this.loading.dismiss()
                    this.notificationProvider.presentAlertError('La imagen no ha sido cargada correctamente.')
                    reject()
                }
            }, error => {
                this.loading.dismiss()
                this.notificationProvider.presentAlertError('Error de conexión con el servidor de imágenes.')
                reject()
            })
        })
    }

    static EmailIsValid(control: FormGroup) {

        let email: AbstractControl = control.controls.email; // to get value in input tag

        var EMAIL_REGEXP = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

        if (email.value != null && control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(email.value))) {
            email.setErrors({ EmailIsValid: true })
        }
        else {
            email.setErrors(null)
            return null
        }
    }
}
