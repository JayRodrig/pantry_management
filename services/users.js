// LOCAL MODULES
const {getDbConn,} = require('./db/db');
const {dbAddr,} = require('./db/config');

// USER SERVICE FUNCTIONS
const postUser = (name, username, email, dob, phone_number) => getDbConn(dbAddr).oneOrNone(
    `
        INSERT INTO users
            (name, username, email, dob, phone_number) 
        VALUES
            ($[name], $[username], $[email], $[dob], $[phone_number])
    `, {name, username, email, dob, phone_number}
);

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
    postUser,
    getUserByID,
    getUserByEmail,
};