// LOCAL MODULES
const {getDbConn,} = require('./db/db');
const {dbAddr,} = require('./db/config');

// PRODUCT SERVICE FUNCTIONS
const postProduct = (
        product_name, product_url, product_image, product_original_weight, product_original_weight_type, product_gram_weight, product_price, product_owner
    ) => getDbConn(dbAddr).oneOrNone(
    `
        INSERT INTO products 
            (product_name, product_url, product_image, product_original_weight, product_original_weight_type, product_gram_weight, product_price, product_owner)
        VALUES 
            ($[product_name], $[product_url], $[product_image], $[product_original_weight], $[product_original_weight_type], $[product_gram_weight], $[product_price], $[product_owner])
        RETURNING products.product_id
    `, {product_name, product_url, product_image, product_original_weight, product_original_weight_type, product_gram_weight, product_price, product_owner}
);

const getProductByID = id => getDbConn(dbAddr).any(
    `
        SELECT * 
            FROM products
        WHERE products.product_id = $[id]
    `, {id,}
);

const updateProduct = (
        id, product_name, product_url, product_image, product_original_weight, product_original_weight_type, product_gram_weight, product_price, product_owner
    ) => getDbConn(dbAddr).oneOrNone(
    `
        UPDATE products
            SET
        product_name = $[product_name], product_url = $[product_url], product_image = $[product_image], product_original_weight = $[product_original_weight],
        product_original_weight_type = $[product_original_weight_type], product_gram_weight = $[product_gram_weight], product_price = $[product_price], product_owner = $[product_owner]
            WHERE
        products.product_id = $[id] RETURNING product_id
    `, {id, product_name, product_url, product_image, product_original_weight, product_original_weight_type, product_gram_weight, product_price, product_owner}
);

const deleteProduct = id => getDbConn(dbAddr).oneOrNone(
    `DELETE FROM products
        WHERE
    product_id = $[id] RETURNING product_id
    `, {id}
);

module.exports = {
    postProduct,
    getProductByID,
    updateProduct,
    deleteProduct,
};