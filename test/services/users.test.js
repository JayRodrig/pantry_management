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