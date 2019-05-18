// LOCAL MODULES
const {getDbConn,} = require('./db/db');
const {dbAddr,} = require('./db/config');

// PRODUCT SERVICE FUNCTIONS

//GET INGREDIENT BY ID
const getIngredientByID = id => getDbConn(dbAddr).any(
    `
        SELECT * 
            FROM ingredients
        WHERE ingredients.ingredient_id = $[id]
    `, {id,}
);

//GET INGREDIENT BY NAME
const getIngredientByName = name => getDbConn(dbAddr).any(
    `
        SELECT * 
            FROM ingredients
        WHERE ingredients.ingredient_name = $[name]
    `, {name,}
);


module.exports = {
    getIngredientByID,
    getIngredientByName,
};