jest.mock('../../services/db/db');
const {getDbConn,} = require('../../services/db/db');

const {
    postProduct,
    getProductByID,
    updateProduct,
    deleteProduct,
} = require('../../services/products');

test('postProduct will return getDbConn.onerOrNone', done => {
    const mockNone = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            none: mockNone,
        };
    });
    postProduct()
        .then(_ => {
            expect(mockNone.mock.calls.length).toBe(1);
            done();
        });
});

test('getProductByID will return getDbConn.any', done => {
    const mockAny = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            any: mockAny,
        };
    });
    getProductByID()
        .then(_ => {
            expect(mockAny.mock.calls.length).toBe(1);
            done();
        });
});

test('updateProduct will return getDbConn.onerOrNone', done => {
    const mockOneOrNone = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            oneOrNone: mockOneOrNone,
        };
    });
    updateProduct()
        .then(_ => {
            expect(mockOneOrNone.mock.calls.length).toBe(1);
            done();
        });
});

test('deleteProduct will return getDbConn.onerOrNone', done => {
    const mockOneOrNone = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            oneOrNone: mockOneOrNone,
        };
    });
    deleteProduct()
        .then(_ => {
            expect(mockOneOrNone.mock.calls.length).toBe(1);
            done();
        });
});