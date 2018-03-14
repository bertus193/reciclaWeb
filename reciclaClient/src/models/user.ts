import { RecycleItem } from "./recycleItem";

export class User {
    id: number;
    email: string;
    name: string;
    fullName: string;
    profilePicture: string;
    accessToken: string;
    recycleItems: RecycleItem[];
    createdDate: Date;
    lastPosition: any
}