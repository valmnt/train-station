export class Train {
    id: string;
    destination: string;
    departureTime: Date;
    plateform: string

    constructor(id: string, destination: string, departureTime: Date, plateform: string) {
        this.id = id;
        this.destination = destination;
        this.departureTime = departureTime;
        this.plateform = plateform;
    }
}