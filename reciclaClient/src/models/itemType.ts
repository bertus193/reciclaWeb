import { TypeRecycle } from "./typeRecicle";

export interface ItemType {
    id: number;
    type: TypeRecycle;
    recycleValue: number;
    recycleItems: number[];
    storages: number[];
}