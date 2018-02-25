import { Component } from '@angular/core';
import { RecycleItem } from '../../../models/recycleItem';
import { TypeRecycle } from '../../../models/typeRecicle';

@Component({
    selector: 'page-myRecycledItems',
    templateUrl: 'myRecycledItems.html'
})
export class myRecycledItemsPage {
    recycleItems: RecycleItem[]
    recycleItemHTML: string

    constructor(
    ) {
        this.recycleItems = []
    }

    ionViewDidLoad() {
        this.recycleItemHTML =
            "<ion-card><ion-item>" +
            "<ion-avatar item-start>" +
            "<img src='img / marty - avatar.png'>" +
            "</ion-avatar>" +
            "Item Name" +
            "<p>itemType</p>" +
            "<!--{{ user.createdDate | date: 'dd/MM/yyyy H:mm'}}-->" +
            "</ion-item></ion-card>"
    }

    public getItemType(itemTypeId: number): string {
        console.log(itemTypeId + " " + TypeRecycle[itemTypeId])
        if (TypeRecycle[itemTypeId]) {
            return TypeRecycle[itemTypeId]
        }
    }


}
