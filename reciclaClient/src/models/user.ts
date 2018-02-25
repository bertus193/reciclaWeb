import { RecycleItem } from "./recycleItem";

export interface User {
    id: number;
    email: string;
    name: string;
    fullName: string;
    profilePicture: string;
    accessToken: string;
    recycleItems: RecycleItem[];
    createdDate: Date
}