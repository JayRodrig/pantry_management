// LOCAL MODULES
const {getDbConn,} = require('./db/db');
const {dbAddr,} = require('./db/config');

// PRODUCT SERVICE FUNCTIONS
const postProduct = (
        product_name, product_url, product_image, product_original_weight, product_gram_weight, product_price, product_owner
    ) => getDbConn(dbAddr).none(
    `
        INSERT INTO products 
            (product_name, product_url, product_image, product_original_weight, product_gram_weight, product_price, product_owner)
        VALUES 
            ($[product_name], $[product_url], $[product_image], $[product_original_weight], $[product_gram_weight], $[product_price], $[product_owner])
    `, {product_name, product_url, product_image, product_original_weight, product_gram_weight, product_price, product_owner}
);

const getProductByID = id => getDbConn(dbAddr).any(
    `
        SELECT * 
            FROM products
        WHERE products.product_id = $[id]
    `, {id,}
);

module.exports = {
    postProduct,
    getProductByID,
};