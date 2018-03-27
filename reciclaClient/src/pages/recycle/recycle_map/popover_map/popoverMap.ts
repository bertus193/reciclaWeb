import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { MapPage } from '../recycleMap';

@Component({
    template: `
      <ion-list style="height: 125px;">
        <button ion-item (click)="viewOnExtenalMap()">Abrir en Mapas</button>
        <button ion-item (click)="showRadioModifyItemType()">Modificar el tipo</button>
        <button ion-item (click)="modifyRecycleName()">Modificar el nombre</button>
      </ion-list>
    `
})
export class PopoverMap {
    private mapPage: MapPage

    constructor(
        private viewCtrl: ViewController,
        private params: NavParams) {
        this.mapPage = this.params.get('mapPage');
    }

    close() {
        this.viewCtrl.dismiss();
    }

    public viewOnExtenalMap() {
        this.mapPage.viewOnExtenalMap()
        this.viewCtrl.dismiss();
    }

    public showRadioModifyItemType() {
        this.mapPage.showRadioModifyItemType()
        this.viewCtrl.dismiss();
    }

    public modifyRecycleName() {
        this.mapPage.modifyRecycleName()
        this.viewCtrl.dismiss();
    }
}