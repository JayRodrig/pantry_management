const {convertToGrams,} = require('../../services/weightConversions');

test('If no weight is passed in no calculations will be made', done => {
    expect(convertToGrams(10)).toBe('weight type not found');
    expect(convertToGrams()).toBe('weight type not found');
    expect(convertToGrams(10, 'not-a-weight-type')).toBe('weight type not found');
    done();
})

test('tspToGrams will multiply weight * 5 to return grams', done => {
    expect(convertToGrams(5, 'teaspoon')).toEqual(25);
    expect(convertToGrams(10, 'teaspoon')).toEqual(50);
    expect(convertToGrams(2, 'teaspoon')).toEqual(10);
    done();
});

test('tbspToGrams will multiply weight * 14 to return grams', done => {
    expect(convertToGrams(5, 'tablespoon')).toEqual(70);
    expect(convertToGrams(10, 'tablespoon')).toEqual(140);
    expect(convertToGrams(2, 'tablespoon')).toEqual(28);
    done();
});

test('dspToGrams will multiply weight * 10 to return grams', done => {
    expect(convertToGrams(5, 'dessertspoon')).toEqual(50);
    expect(convertToGrams(10, 'dessertspoon')).toEqual(100);
    expect(convertToGrams(2, 'dessertspoon')).toEqual(20);
    done();
});

test('flozToGrams will multiply weight * 25.2 to return grams', done => {
    expect(convertToGrams(5, 'fluid ounce')).toEqual(126);
    expect(convertToGrams(10, 'fluid ounce')).toEqual(252);
    expect(convertToGrams(2, 'fluid ounce')).toEqual(50.4);
    done();
});

test('ozToGrams will multiply weight * 28.35 to return grams', done => {
    expect(convertToGrams(5, 'ounce')).toEqual(141.75);
    expect(convertToGrams(10, 'ounce')).toEqual(283.5);
    expect(convertToGrams(2, 'ounce')).toEqual(56.70);
    done();
});

test('cupToGrams will multiply weight * 128 to return grams', done => {
    expect(convertToGrams(5, 'cup')).toEqual(640);
    expect(convertToGrams(10, 'cup')).toEqual(1280);
    expect(convertToGrams(2, 'cup')).toEqual(256);
    done();
});

test('cupLqToGrams will multiply weight * 240 to return grams', done => {
    expect(convertToGrams(5, 'cup liquid')).toEqual(1200);
    expect(convertToGrams(1, 'cup liquid')).toEqual(240);
    expect(convertToGrams(2, 'cup liquid')).toEqual(480);
    done();
});

test('pintLqToGrams will multiply weight * 473.18 to return grams', done => {
    expect(convertToGrams(5, 'pint liquid')).toEqual(2365.9);
    expect(convertToGrams(1, 'pint liquid')).toEqual(473.18);
    expect(convertToGrams(2, 'pint liquid')).toEqual(946.36);
    done();
});


test('pintToGrams will multiply weight * 550.61 to return grams', done => {
    expect(convertToGrams(5, 'pint')).toEqual(2753.05);
    expect(convertToGrams(1, 'pint')).toEqual(550.61);
    expect(convertToGrams(2, 'pint')).toEqual(1101.22);
    done();
});

test('poundToGrams will multiply weight * 453.59 to return grams', done => {
    expect(convertToGrams(5, 'pound')).toEqual(2267.95);
    expect(convertToGrams(1, 'pound')).toEqual(453.59);
    expect(convertToGrams(2, 'pound')).toEqual(907.18);
    done();
});

test('kiloToGrams will multiply weight * 1000 to return grams', done => {
    expect(convertToGrams(5, 'kilo')).toEqual(5000);
    expect(convertToGrams(1, 'kilo')).toEqual(1000);
    expect(convertToGrams(2, 'kilo')).toEqual(2000);
    done();
});

test('litreToGrams will multiply weight * 1000 to return grams', done => {
    expect(convertToGrams(5, 'litre')).toEqual(5000);
    expect(convertToGrams(1, 'litre')).toEqual(1000);
    expect(convertToGrams(2, 'litre')).toEqual(2000);
    done();
});

test('gallonToGrams will multiply weight * 3785.41 to return grams', done => {
    expect(convertToGrams(5, 'gallon')).toEqual(18927.05);
    expect(convertToGrams(1, 'gallon')).toEqual(3785.41);
    expect(convertToGrams(2, 'gallon')).toEqual(7570.82);
    done();
});