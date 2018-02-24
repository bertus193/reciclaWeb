import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import {
    GoogleMaps,
    GoogleMapsEvent,
    GoogleMapOptions,
    MarkerOptions,
    Marker,
    LatLng
} from '@ionic-native/google-maps';

@Component({
    selector: 'page-recycleMap',
    templateUrl: 'recycleMap.html'
})
export class MapPage {

    map: any;

    typeRecycle: any;
    position: any;

    constructor(
        private googleMaps: GoogleMaps,
        private navParams: NavParams) {

        this.typeRecycle = this.navParams.get("typeRecycle");
        this.position = this.navParams.get("position");
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {
        console.log(this.position)
        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: this.position.coords.latitude, // default location
                    lng: this.position.coords.longitude // default location
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = this.googleMaps.create('map_canvas', mapOptions);

        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
                let latLng = new LatLng(this.position.coords.latitude, this.position.coords.longitude);

                this.createMarker(latLng, "Yo").then((marker: Marker) => {
                    marker.showInfoWindow();

                }).catch(error => {
                    console.log(error);
                });
            })
            .catch(error => {
                console.log(error);
            });

    }

    createMarker(loc: LatLng, title: string) {
        let markerOptions: MarkerOptions = {
            position: loc,
            title: title
        }
        return this.map.addMarker(markerOptions);
    }



}
