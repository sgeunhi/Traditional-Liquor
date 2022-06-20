const filter = {
    and: function (e, f1, f2, f3, f4) {
        return f1(e) && f2(e) && f3(e) && f4(e)
    },
    largeVolume:  (alcohol) => { return alcohol.volume > 375 },
    smallVolume:  (alcohol) => { return alcohol.volume <= 375 },
    expensive:  (alcohol) => { return alcohol.price >= 10000 },
    cheap:  (alcohol) => { return alcohol.price < 10000 },
    highAlcohol:  (alcohol) => { return alcohol.alcohol >= 15 },
    lowAlcohol:  (alcohol) => { return alcohol.alcohol < 15 },
    young:  (alcohol) => { return alcohol.typeofAlcohol.includes('과실주') || alcohol.typeofAlcohol.includes('리큐르') },
    old:  (alcohol) => { return alcohol.typeofAlcohol.includes('탁주') || alcohol.typeofAlcohol.includes('소주') }
}

export default filter;