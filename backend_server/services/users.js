// LOCAL MODULES
const {getDbConn,} = require('./db/db');
const {dbAddr,} = require('./db/config');

// USER SERVICE FUNCTIONS
const getUserByID = id => getDbConn(dbAddr).one(
    `
        SELECT * FROM users WHERE users.user_id = $[id]
    `, {id,}
);

const getUserByEmail = email => getDbConn(dbAddr).one(
    `
        SELECT * FROM users WHERE users.email = $[email]
    `, {email,}
);

module.exports = {
    getUserByID,
    getUserByEmail,
};