import { RecycleItem } from "./recycleItem";

export interface Storage {
    id: number;
    name: string;
    recycledItems: RecycleItem[];
    itemType: number;
    storagePoint: number;
}