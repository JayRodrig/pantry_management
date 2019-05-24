jest.mock('../../services/db/db');
const {getDbConn,} = require('../../services/db/db');

const {
    createProductInPantry,
    getPantryItemByID,
    getPantryItemByName,
    getPantryItemsOfUser,
    getPantryItemOfUserByName,
} = require('../../services/currentPantry');

test('createProductInPantry will return getDbConn.one', done => {
    const mockOne = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            one: mockOne,
        };
    });
    createProductInPantry()
        .then(_ => {
            expect(mockOne.mock.calls.length).toBe(1);
            done();
        });
});

test('getPantryItemByID will return getDbConn.any', done => {
    const mockAny = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            any: mockAny,
        };
    });
    getPantryItemByID()
        .then(_ => {
            expect(mockAny.mock.calls.length).toBe(1);
            done();
        });
});

test('getPAntryItemByName will return getDbConn.any', done => {
    const mockAny = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            any: mockAny,
        };
    });
    getPantryItemByName()
        .then(_ => {
            expect(mockAny.mock.calls.length).toBe(1);
            done();
        });
});

test('getPantryItemsOfUser will return getDbConn.any', done => {
    const mockAny = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            any: mockAny,
        };
    });
    getPantryItemsOfUser()
        .then(_ => {
            expect(mockAny.mock.calls.length).toBe(1);
            done();
        });
});

test('getPantryItemOfUserByName will return getDbConn.any', done => {
    const mockAny = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            any: mockAny,
        };
    });
    getPantryItemOfUserByName()
        .then(_ => {
            expect(mockAny.mock.calls.length).toBe(1);
            done();
        });
});