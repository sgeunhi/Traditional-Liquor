// 전통술 class
export class Alcohol {
    constructor(id, name, detailUrl, imageUrl, description, typeofAlcohol, alcohol, volume, price) {
        this.id = id;
        this.name = name;
        this.detailUrl = detailUrl;
        this.imageUrl = imageUrl;
        this.description = description;
        this.typeofAlcohol = typeofAlcohol;
        this.alcohol = alcohol;
        this.volume = volume;
        this.price = price;
    }

    static fromData(data) {
        return Object.assign(new Alcohol(), data)
    }

    toData() {
        return {
            id: this.id,
            name: this.name,
            detailUrl: this.detailUrl,
            imageUrl: this.imageUrl,
            description: this.description,
            typeofAlcohol: this.typeofAlcohol,
            alcohol: this.alcohol,
            volume: this.volume,
            price: this.price
        }
    }
}