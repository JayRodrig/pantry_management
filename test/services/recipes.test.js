jest.mock('../../services/db/db');
const {getDbConn,} = require('../../services/db/db');

const {
    postRecipe,
    getRecipeByID,
    updateRecipe,
    deleteRecipe,
} = require('../../services/recipes');

test('postRecipe will return getDbConn.onerOrNone', done => {
    const mockOneOrNone = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            oneOrNone: mockOneOrNone,
        };
    });
    postRecipe()
        .then(_ => {
            expect(mockOneOrNone.mock.calls.length).toBe(1);
            done();
        });
});

test('getRecipeByID will return getDbConn.any', done => {
    const mockAny = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            any: mockAny,
        };
    });
    getRecipeByID()
        .then(_ => {
            expect(mockAny.mock.calls.length).toBe(1);
            done();
        });
});

test('updateRecipe will return getDbConn.onerOrNone', done => {
    const mockOneOrNone = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            oneOrNone: mockOneOrNone,
        };
    });
    updateRecipe()
        .then(_ => {
            expect(mockOneOrNone.mock.calls.length).toBe(1);
            done();
        });
});

test('deleteRecipe will return getDbConn.onerOrNone', done => {
    const mockOneOrNone = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            oneOrNone: mockOneOrNone,
        };
    });
    deleteRecipe()
        .then(_ => {
            expect(mockOneOrNone.mock.calls.length).toBe(1);
            done();
        });
});