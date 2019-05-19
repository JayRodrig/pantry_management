// LOCAL MODULES
const {getDbConn,} = require('./db/db');
const {dbAddr,} = require('./db/config');

// RECIPE SERVICE FUNCTIONS
const postRecipe = (recipe_name, health_tags, recipe_owner, recipe_notes) => 
    getDbConn(dbAddr).oneOrNone(
        `
        INSERT INTO recipes
            (recipe_name, health_tags, recipe_owner, recipe_notes)
        VALUES
            ($[recipe_name], $[health_tags], $[recipe_owner], $[recipe_notes])
        RETURNING recipe_id    
        `, {recipe_name, health_tags, recipe_owner, recipe_notes}
);

const getRecipeByID = id => getDbConn(dbAddr).any(
    `
        SELECT * 
            FROM recipes JOIN ingredients
        ON recipes.recipe_id = ingredients.recipe_id
            JOIN current_pantry 
        ON ingredients.product_id = current_pantry.product_id
            WHERE recipes.recipe_id = $[id]
    `, {id,}
);

const updateRecipe = (id, recipe_name, health_tags, recipe_owner, recipe_notes) => 
    getDbConn(dbAddr).oneOrNone(
        `
        UPDATE recipes SET
            recipe_name = $[recipe_name], health_tags = $[health_tags], recipe_owner = $[recipe_owner],
            recipe_notes = $[recipe_notes]
        WHERE recipe_id = $[id] RETURNING recipe_id
        `, {id, recipe_name, health_tags, recipe_owner, recipe_notes,}
);

const deleteRecipe = id => getDbConn(dbAddr).oneOrNone(
    `
    DELETE FROM recipes
        WHERE 
    recipes.recipe_id = $[id]
        RETURNING recipe_id
    `, {id,}
);

module.exports = {
    postRecipe,
    getRecipeByID,
    updateRecipe,
    deleteRecipe,
};