import { User } from "./user";
import { ItemType } from "./itemType";


export interface RecycleItem {
    id: number;
    name: string;
    image: string;
    user: User;
    storage: number;
    itemType: ItemType;
}