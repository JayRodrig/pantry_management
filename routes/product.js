/*
    TODO:
        - INPUT VALIDATION
*/

// NPM MODULES
const express = require('express');

// LOCAL MODULES
const ProductServices = require('../services/products');

const postProduct = (request, response) => {
    const {
        product_name, product_url, product_image, product_original_weight, product_original_weight_type, product_gram_weight, product_price, product_owner,
    } = request.body;
    ProductServices.postProduct(product_name, product_url, product_image, product_original_weight, product_original_weight_type, product_gram_weight, product_price, product_owner)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully created user.`,
                data,
            });
        })
        .catch(e => {
            console.log(e);
            response.status(400).json({
                'msg': `Something went wrong.`,
                e,
            });
        });
};

const getProductByID = (request, response) => {
    const {id,} = request.params;
    ProductServices.getProductByID(id)
        .then(data => {
            response.status(200);
            response.json({
                'msg': `Successfully retrieved user data.`,
                data,
            });
        })
        .catch(e => {
            response.status(400);
            response.json({
                'msg': `Something went wrong.`,
                e,
            });
        });
};

const getProductRouter = _ => {
    const ProductRouter = express.Router();

    ProductRouter.get('/id/:id', getProductByID);
    ProductRouter.post('/', postProduct);

    return ProductRouter;
};

module.exports = {
    getProductRouter,
};