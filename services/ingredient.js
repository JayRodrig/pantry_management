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


module.exports = {
    getIngredientByID,
    getIngredientByName,
    createIngredient,
};