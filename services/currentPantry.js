// LOCAL MODULES
const { getDbConn, } = require('./db/db');
const { dbAddr, } = require('./db/config');

//CREATE PRODUCT
const createProductInPantry = (product_id, owner_id, weight_left) => getDbConn(dbAddr).one(
    `   
        INSERT INTO current_pantry
        (product_id, 
        owner_id, 
        weight_left) 
        VALUES 
        ($[product_id], 
        $[owner_id], 
        $[weight_left]) RETURNING weight_left;`
    , { product_id, owner_id, weight_left }
);

//GET INGREDIENT BY ID
const getPantryItemByID = id => getDbConn(dbAddr).any(
    `
        SELECT current_pantry.*,
            products.*
            FROM current_pantry
            JOIN products
            ON products.product_id = current_pantry.product_id
        WHERE current_pantry.product_id = $[id]
    `, { id, }
);

//GET PANTRY ITEM BY NAME
const getPantryItemByName = name => getDbConn(dbAddr).any(    
    `
        SELECT current_pantry.*,
            products.*
            FROM current_pantry
            JOIN products
            ON products.product_id = current_pantry.product_id
        WHERE products.product_name LIKE $[name]
    `, { name, }
);

module.exports = {
    getPantryItemByID,
    getPantryItemByName,
    createProductInPantry,    
};