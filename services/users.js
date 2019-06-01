// LOCAL MODULES
const {getDbConn,} = require('./db/db');
const {dbAddr,} = require('./db/config');

// USER SERVICE FUNCTIONS
const postUser = (name, username, email, firebase_uid, dob, phone_number, diet_preference, food_limitations, food_allergies) => getDbConn(dbAddr).oneOrNone(
    `
        INSERT INTO users
            (name, username, email, firebase_uid, dob, phone_number, diet_preference, food_limitations, food_allergies) 
        VALUES
            ($[name], $[username], $[email], $[firebase_uid], $[dob], $[phone_number], $[diet_preference], $[food_limitations], $[food_allergies])
        RETURNING user_id
    `, {name, username, email, firebase_uid, dob, phone_number, diet_preference, food_limitations, food_allergies}
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

const updateUser = (id, name, username, email, firebase_uid, dob, phone_number, diet_preference, food_limitations, food_allergies) => getDbConn(dbAddr).oneOrNone(
    `
        UPDATE users
            SET
        name = $[name], username = $[username], email = $[email], firebase_uid = $[firebase_uid], dob = $[dob], 
        phone_number = $[phone_number], diet_preference = $[diet_preference], food_limitations = $[food_limitations],
        food_allergies = $[food_allergies]
            WHERE
        users.user_id = $[id] RETURNING user_id
    `, {id, name, username, email, firebase_uid, dob, phone_number, diet_preference, food_limitations, food_allergies,}
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