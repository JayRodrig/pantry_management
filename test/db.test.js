jest.mock('pg-promise')
const pgp = require('pg-promise')

const {getDbConn,} = require('../services/db/db');

test('returns same object after multiple invocations', done => {
    pgp.mockImplementation(() => {
        return () => Math.floor(Math.random()*10);
    });

    const initialVal = getDbConn('testing');

    expect(pgp.mock.calls[0][0]).toEqual({});
    expect(getDbConn('testing')).toBe(initialVal);
    done();
});