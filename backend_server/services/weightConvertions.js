

//Convert teaspoon to grams 
const tspToGrams = (teaspoons) => {
    const grams = teaspoons * 5;
    return grams;
}

//Convert tablespoon to grams
const tbspToGrams = (tablespoons) => {
    const grams = tablespoons * 14;
    return grams;
}

//Convert dessertspoon to grams
const dspToGrams = (dessertspoon) => {
    const grams = dessertspoon * 10;
    return grams;
}

//Convert fluid ounce to grams
const flozToGrams = (fluidOunce) => {
    const grams = fluidOunce * 25.2;
    return grams;
}

//Convert ounce (dry) to grams
const ozToGrams = (fluidOunce) => {
    const grams = fluidOunce * 28.35;
    return grams;
}

//Convert cup (dry) to grams
const cupToGrams = (cup) => {
    const grams = cup * 128;
    return grams;
}

//Convert cup (liquid milk) to grams
const cupLqToGrams = (cup) => {
    const grams = cup * 240;
    return grams;
}

//Convert pint liquid (water) to grams in US
const pintLqToGrams = (pint) => {
    const grams = pint * 473.18;
    return grams;
}

//Convert pint dry to grams in US
const pintToGrams = (pint) => {
    const grams = pint * 550.61;
    return grams;
}

//Convert pound to grams 
const poundToGrams = (pounds) => {
    const grams = pounds * 453.59;
    return grams;
}

//Convert kilo to grams
const kiloToGrams = (kilos) => {
    const grams = kilos * 1000;
    return grams;
}

//Convert litre to grams
const litreToGrams = (litres) => {
    const grams = litres * 1000;
    return grams;
}

//Convert gallon to grams
const gallonToGrams = (gallons) => {
    const grams = gallons * 3785.41;
    return grams;
}

const convertToGrams = (weight, weightType) => {
    if (weightType === 'teaspoon'){
         return tspToGrams(weight);
    }
    if (weightType === 'tablespoon'){
        return tbspToGrams(weight);
    }
    if (weightType === 'dessertspoon'){
        return dspToGrams(weight);
    }
    if (weightType === 'fluid ounce'){
        return flozToGrams(weight);
    }
    if (weightType === 'ounce'){
        return ozToGrams(weight);
    }
    if (weightType === 'cup'){
        return cupToGrams(weight);
    }
    if (weightType === 'cup liquid'){
        return cupLqToGrams(weight);
    }
    if (weightType === 'pint'){
        return pintToGrams(weight);
    }
    if (weightType === 'pint liquid'){
        return pintLqToGrams(weight);
    }
    if (weightType === 'pound'){
        return poundToGrams(weight);
    }
    if (weightType === 'kilo'){
        return kiloToGrams(weight);
    }
    if (weightType === 'litre'){
        return litreToGrams(weight);
    }
    if (weightType === 'gallon'){
        return gallonToGrams(weight);
    }
    else {
        return 'weight type not found';
    }

}

module.exports = {
    convertToGrams,
}