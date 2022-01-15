export class MongoGeoPoint {
    public readonly type: string = 'Point';
    public coordinates: number[] = [];

    constructor(params?: Partial<MongoGeoPoint>) {
        if (!!params) {
            // the type is always a 'Point'

            // coordinates will only contain 2 items
            // long first and then lat
            const coordLength = 2;
            this.coordinates = Array.isArray(params.coordinates) && params.coordinates.length === coordLength
                ? params.coordinates
                : this.coordinates;
        }
    }
}
