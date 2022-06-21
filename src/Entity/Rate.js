export class Rate {
    constructor(id, userId, userNickname, alcoholId, numberOfStars, reviewText, timestamp) {
        this.id = id;
        this.userId = userId;
        this.userNickname = userNickname
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
            userNickname: this.userNickname,
            alcoholId: this.alcoholId,
            numberOfStars: this.numberOfStars,
            reviewText: this.reviewText,
            timestamp: this.timestamp
        }
    }
}
