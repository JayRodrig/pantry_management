// LOCAL MODULES
const {getDbConn,} = require('./db/db');
const {dbAddr,} = require('./db/config');

// PRODUCT SERVICE FUNCTIONS
const getProductByID = id => getDbConn(dbAddr).any(
    `
        SELECT * 
            FROM products
        WHERE products.product_id = $[id]
    `, {id,}
);

module.exports = {
    getProductByID,
};