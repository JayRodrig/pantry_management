//NPM MODULES
const pgp = require("pg-promise")({});

// GLOBAL VARIABLES
const dbName = 'pantry_management';
const dbAddr = pgp(process.env.DATABASE_URL || `postgres://localhost/${dbName}`);

module.exports = {
    dbAddr,
};