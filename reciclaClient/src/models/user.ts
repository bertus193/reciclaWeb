import { RecycleItem } from "./recycleItem";
import { TypeUser } from "./typeUser";

export class User {
    id: number;
    email: string;
    password: string
    username: string;
    fullName: string;
    profilePicture: string;
    accessToken: string;
    recycleItems: RecycleItem[];
    createdDate: Date;
    lastPosition: any
    type: TypeUser
    points: number
}