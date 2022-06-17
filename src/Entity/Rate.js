export class Rate {
    constructor(id, alcoholId, numberOfStars) {
        this.id = id;
        this.alcoholId = alcoholId;
        this.numberOfStars = numberOfStars;
    }

    static fromData(data) {
        return Object.assign(new Rate(), data)
    }
}