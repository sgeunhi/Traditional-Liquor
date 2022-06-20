export class Rate {
    constructor(id, userId, alcoholId, numberOfStars, reviewText, timestamp) {
        this.id = id;
        this.userId = userId;
        this.alcoholId = alcoholId;
        this.numberOfStars = numberOfStars;
        this.reviewText = reviewText;
        this.timestamp = timestamp;
    }

    static fromData(data) {
        return Object.assign(new Rate(), data);
    }

    toData() {
        return {
            userId: this.userId,
            alcoholId: this.alcoholId,
            numberOfStars: this.numberOfStars,
            reviewText: this.reviewText,
            timestamp: this.timestamp
        }
    }
}