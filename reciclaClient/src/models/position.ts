export class Position {
    id: number;
    latitude: number;
    longitude: number;

    public constructor(latitude, longitude) {
        this.latitude = latitude
        this.longitude = longitude
    }
}