// LOCAL MODULES
const {getDbConn,} = require('./db/db');
const {dbAddr,} = require('./db/config');

// PRODUCT SERVICE FUNCTIONS
const getIngredientByID = id => getDbConn(dbAddr).any(
    `
        SELECT * 
            FROM ingredients
        WHERE ingredients.ingredient_id = $[id]
    `, {id,}
);

module.exports = {
    getIngredientByID,
};