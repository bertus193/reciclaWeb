import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker
} from '@ionic-native/google-maps';

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage {

    map: any;

    constructor(public navCtrl: NavController,
        private googleMaps: GoogleMaps) {

    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {
        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: 43.0741904, // default location
                    lng: -89.3809802 // default location
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = this.googleMaps.create('map_canvas', mapOptions);

        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
                // Now you can use all methods safely.
                //this.getPosition();
            })
            .catch(error => {
                console.log(error);
            });

    }



}
