export class Position {
    id: number;
    latitude: number;
    longitude: number;

    public constructor(id, latitude, longitude) {
        this.id = id
        this.latitude = latitude
        this.longitude = longitude
    }
}