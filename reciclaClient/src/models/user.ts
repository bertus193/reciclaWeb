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
    gamePoints: number
    lastGameDate: Date
    questionsDone: any
    enabled: boolean
    collective: any
    gender: string
    school: string
    birthdate: any

    public constructor() {
        var currentDate = new Date()
        this.id = -1
        this.email = null
        this.password = null
        this.username = null
        this.fullName = null
        this.profilePicture = null
        this.accessToken = null
        this.recycleItems = []
        this.createdDate = currentDate
        this.lastPosition = null
        this.type = TypeUser.Normal
        this.points = 0
        this.gamePoints = 0
        this.lastGameDate = new Date(currentDate.getTime() - (1000 * 60 * 60 * 24))
        this.questionsDone = []
        this.enabled = true
        this.collective = null /*Instantiated on backend*/
        this.gender = "NSNC"
        this.school = null
        this.birthdate = new Date()
    }
}