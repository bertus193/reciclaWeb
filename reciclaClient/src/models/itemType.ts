export class ItemType {
    id: number;
    type: string;
    typeEs: string;
    typeColor: string;
    recycleValue: number;
    recycleItems: number[];
    storages: number[];

    constructor(type: string, recycleValue: number) {
        this.type = type
        this.recycleValue = recycleValue
    }
}