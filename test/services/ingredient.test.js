jest.mock('../../services/db/db');
const {getDbConn,} = require('../../services/db/db');

const {
    createIngredient,
    getIngredientByID,
    getIngredientByName,
    getRecipeIngredients,
    updateIngredient,
    deleteIngredient,
} = require('../../services/ingredient');

test('createIngredient will return getDbConn.onerOrNone', done => {
    const mockOne = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            one: mockOne,
        };
    });
    createIngredient()
        .then(_ => {
            expect(mockOne.mock.calls.length).toBe(1);
            done();
        });
});

test('getIngredientByID will return getDbConn.any', done => {
    const mockAny = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            any: mockAny,
        };
    });
    getIngredientByID()
        .then(_ => {
            expect(mockAny.mock.calls.length).toBe(1);
            done();
        });
});

test('getIngredientByName will return getDbConn.any', done => {
    const mockAny = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            any: mockAny,
        };
    });
    getIngredientByName()
        .then(_ => {
            expect(mockAny.mock.calls.length).toBe(1);
            done();
        });
});

test('getRecipeIngredients will return getDbConn.any', done => {
    const mockAny = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            any: mockAny,
        };
    });
    getRecipeIngredients()
        .then(_ => {
            expect(mockAny.mock.calls.length).toBe(1);
            done();
        });
});

test('updateIngredient will return getDbConn.none', done => {
    const mockNone = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            none: mockNone,
        };
    });
    updateIngredient()
        .then(_ => {
            expect(mockNone.mock.calls.length).toBe(1);
            done();
        });
});

test('deleteIngredient will return getDbConn.none', done => {
    const mockNone = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            none: mockNone,
        };
    });
    deleteIngredient()
        .then(_ => {
            expect(mockNone.mock.calls.length).toBe(1);
            done();
        });
});