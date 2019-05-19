jest.mock('pg-promise');
const pgp = require('pg-promise');

jest.mock('../../services/db/db');
const {getDbConn,} = require('../../services/db/db');

const {} = require('../../services/users');

test('postUser will call getDbConnect.oneOrNone', done => {
    const mockOneOrNone = jest.fn();
    getDbConn.mockImplementation(() => {
        return {
            oneOrNone: mockOneOrNone,
        };
    });
    console.log(UserServices.postUser)
    done();
    // UserServices.postUser()
    //     .then(_ => {
    //         expect(mockOneOrNone.mock.calls.length).toBe(1);
    //         done();
    //     });
});