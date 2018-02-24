import { RecycleItem } from "./recycleItem";

export class Storage {
    id: number;
    name: string;
    recycledItems: RecycleItem[];
    itemType: number;
    storagePoint: number;
}