export class RecycleItem {
    id: number;
    name: string;
    image: string;
    recycleUser: any;
    storage: any;
    itemType: any;
    createdDate: Date

    public constructor() {
        this.id = null
        this.name = ''
        this.image = 'assets/imgs/quieroReciclar.png'
        this.createdDate = new Date()

    }
}