import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
    selector: 'page-recycle',
    templateUrl: 'recycle.html'
})
export class RecyclePage {

    image: string = null;

    constructor(public navCtrl: NavController, private camera: Camera) {

    }

    options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }

    getPicture() {
        this.camera.getPicture(this.options)
            .then(imageData => {
                this.image = `data:image/jpeg;base64,${imageData}`;
            })
            .catch(error => {
                console.error(error);
            });
    }

}
