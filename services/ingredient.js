// LOCAL MODULES
const { getDbConn, } = require('./db/db');
const { dbAddr, } = require('./db/config');

// INGREDIENTS SERVICE FUNCTIONS

//CREATE INGREDIENT
const createIngredient = (ingredient_name, recipe_id, product_id, ingredient_weight, ingredient_weight_type, ingredient_gram_weight) => getDbConn(dbAddr).one(
    `   
        INSERT INTO ingredients 
        (ingredient_name, 
        recipe_id, 
        product_id,
        ingredient_weight, 
        ingredient_weight_type, 
        ingredient_gram_weight) 
        VALUES 
        ($[ingredient_name], 
        $[recipe_id], 
        $[product_id],
        $[ingredient_weight],
        $[ingredient_weight_type], 
        $[ingredient_gram_weight]) RETURNING ingredient_id;`
        , { ingredient_name, recipe_id, product_id, ingredient_weight, ingredient_weight_type, ingredient_gram_weight }
);


//GET INGREDIENT BY ID
const getIngredientByID = id => getDbConn(dbAddr).any(
    `
        SELECT * 
            FROM ingredients
        WHERE ingredients.ingredient_id = $[id]
    `, { id, }
);

//GET INGREDIENT BY NAME
const getIngredientByName = name => getDbConn(dbAddr).any(
    `
        SELECT * 
            FROM ingredients
        WHERE ingredients.ingredient_name = $[name]
    `, { name, }
);

//GET INGREDIENTS OF RECIPE BY RECIPE ID
const getRecipeIngredients = id => getDbConn(dbAddr).any(
    `
        SELECT ingredients.*, 
            recipes.recipe_name
        FROM ingredients 
        JOIN recipes
        ON ingredients.recipe_id = recipes.recipe_id
        WHERE ingredients.recipe_id = $[id]
    `, { id, }
);

module.exports = {
    getIngredientByID,
    getIngredientByName,
    createIngredient,
    getRecipeIngredients,
};