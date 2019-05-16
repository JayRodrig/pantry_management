// NPM MODULES
const pgp = require('pg-promise');

// IIFE THAT RETURNS DB CONNECTION
const getDbConn = (_ => {
    let dbConn = null;
    return dbAddr => {
        if (!dbConn) {
            dbConn = pgp({})(dbAddr);
        };
        return dbConn;
    };
})();

module.exports = {
    getDbConn,
};