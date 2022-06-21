const filter = {
    matchConditions: function (e, conditionList) {
        return this[conditionList[0]](e) && this[conditionList[1]](e) && this[conditionList[2]](e) && this[conditionList[3]](e);
    },
    largeVolume:  alcohol => alcohol.volume > 375,
    smallVolume:  alcohol => alcohol.volume <= 375,
    expensive:  alcohol => alcohol.price >= 10000,
    cheap:  alcohol => alcohol.price < 10000,
    highAlcohol:  alcohol => alcohol.alcohol >= 15,
    lowAlcohol:  alcohol => alcohol.alcohol < 15,
    young:  alcohol => alcohol.typeofAlcohol.includes('과실') ||
        alcohol.typeofAlcohol.includes('리큐르') ||
        alcohol.typeofAlcohol.includes('브랜디') ||
        alcohol.typeofAlcohol.includes('와인'),
    old:  alcohol => alcohol.typeofAlcohol.includes('탁주') ||
        alcohol.typeofAlcohol.includes('막걸리') ||
        alcohol.typeofAlcohol.includes('약주') ||
        alcohol.typeofAlcohol.includes('청주') ||
        alcohol.typeofAlcohol.includes('소주')
}

export default filter;