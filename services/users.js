// LOCAL MODULES
const {getDbConn,} = require('./db/db');
const {dbAddr,} = require('./db/config');

// USER SERVICE FUNCTIONS
const postUser = (name, username, email, dob, phone_number, diet_preference, food_limitations, food_alergies) => getDbConn(dbAddr).oneOrNone(
    `
        INSERT INTO users
            (name, username, email, dob, phone_number, diet_preference, food_limitations, food_alergies) 
        VALUES
            ($[name], $[username], $[email], $[dob], $[phone_number], $[diet_preference], $[food_limitations], $[food_alergies])
        RETURNING user_id
    `, {name, username, email, dob, phone_number, diet_preference, food_limitations, food_alergies}
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

const updateUser = (id, name, username, email, dob, phone_number) => getDbConn(dbAddr).oneOrNone(
    `
        UPDATE users
            SET
        name = $[name], username = $[username], email = $[email], dob = $[dob], phone_number = $[phone_number]
        diet_preference = $[diet_preference], food_limitations = $[food_limitations], food_alergies = $[food_alergies]
            WHERE
        users.user_id = $[id] RETURNING user_id
    `, {id, name, username, email, dob, phone_number,}
);

const deleteUser = id => getDbConn(dbAddr).oneOrNone(
    `
        DELETE FROM users
            WHERE
        users.user_id = $[id] RETURNING user_id
    `, {id}
)

module.exports = {
    postUser,
    getUserByID,
    getUserByEmail,
    updateUser,
    deleteUser,
};