jest.mock('express');

jest.mock('body-parser', () => {
    return {
        json: () => 'test',
    };
});

jest.mock('../routes/product');
jest.mock('../routes/recipe');
jest.mock('../routes/user');
jest.mock('../routes/ingredient');
jest.mock('../routes/currentPantry');
jest.mock('../routes/mealSchedule');


const {getUserRouter,} = require('../routes/user');
const {getProductRouter,} = require('../routes/product');
const {getRecipeRouter,} = require('../routes/recipe');
const {getIngredientRouter,} = require('../routes/ingredient');
const {getCurrentPantryRouter,} = require('../routes/currentPantry');
const {getMealScheduleRouter,} = require('../routes/mealSchedule');

const express = require('express');
const bodyParser = require('body-parser');
const {getApp,} = require('../app');

test('getApp tests', done => {
    const mockUse = jest.fn();
    const mockApp = {
        use: mockUse,
    };

    express.mockImplementation(() => {
        return mockApp;
    });

    const app = getApp();

    expect(app).toEqual(mockApp);
    expect(mockUse.mock.calls[0][0]).toBe('test');
    expect(mockUse.mock.calls.length).toEqual(9);
    done();
});