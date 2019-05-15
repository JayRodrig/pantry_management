// LOCAL MODULES
const {getDbConn,} = require('./db/db');
const {dbAddr,} = require('./db/config');

// RECIPE SERVICE FUNCTIONS
const getRecipeByID = id => getDbConn(dbAddr).any(
    `
        SELECT * 
            FROM recipes JOIN ingredients
        ON recipes.recipe_id = ingredients.recipe_id
            WHERE recipes.recipe_id = $[id]
    `, {id,}
);

module.exports = {
    getRecipeByID,
};