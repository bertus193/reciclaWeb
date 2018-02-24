import { TypeRecycle } from "./typeRecicle";

export class ItemType {
    id: number;
    type: TypeRecycle;
    recycleValue: number;
    recycleItems: number[];
    storages: number[];

    constructor(type: TypeRecycle, recycleValue: number) {
        this.type = type
        this.recycleValue = recycleValue
    }
}