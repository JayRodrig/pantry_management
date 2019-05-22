jest.mock('../../services/db/db');
const {getDbConn,} = require('../../services/db/db');

const {
    postUser,
    getUserByID,
    getUserByEmail,
    updateUser,
    deleteUser,
} = require('../../services/users');

test('postUser will call getDbConnect.oneOrNone', done => {
    const mockOneOrNone = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            oneOrNone: mockOneOrNone,
        }
    });
    postUser()
        .then(_ => {
            expect(mockOneOrNone.mock.calls.length).toBe(1);
            done();
        });
});

test('getUserById will call getDbConnect.one', done => {
    const mockOne = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            one: mockOne,
        }
    });
    getUserByID()
        .then(_ => {
            expect(mockOne.mock.calls.length).toBe(1);
            done();
        });
});

test('getUserByEmail will call getDbConnect.one', done => {
    const mockOne = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            one: mockOne,
        }
    });
    getUserByEmail()
        .then(_ => {
            expect(mockOne.mock.calls.length).toBe(1);
            done();
        });
});

test('updateUser will call getDbConnect.oneOrNone', done => {
    const mockOneOrNone = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            oneOrNone: mockOneOrNone,
        }
    });
    updateUser()
        .then(_ => {
            expect(mockOneOrNone.mock.calls.length).toBe(1);
            done();
        });
});

test('deleteUser will call getDbConnect.oneOrNone', done => {
    const mockOneOrNone = jest.fn(() => Promise.resolve());
    getDbConn.mockImplementation(() => {
        return {
            oneOrNone: mockOneOrNone,
        }
    });
    deleteUser()
        .then(_ => {
            expect(mockOneOrNone.mock.calls.length).toBe(1);
            done();
        });
});
