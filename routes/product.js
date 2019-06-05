/*
    TODO:
        - INPUT VALIDATION
*/

// NPM MODULES
const express = require('express');

// LOCAL MODULES
const ProductServices = require('../services/products');
const {convertToGrams,} = require('../services/weightConversions');

const postProduct = (request, response) => {
    const {
        product_name, product_url, product_image, product_original_weight, product_original_weight_type, product_price, product_owner,
    } = request.body;
    const product_gram_weight = convertToGrams(product_original_weight, product_original_weight_type.toLowerCase());
    ProductServices.postProduct(product_name, product_url, product_image, product_original_weight, product_original_weight_type, product_gram_weight, product_price, product_owner)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully created product.`,
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
                'msg': `Successfully retrieved product data.`,
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

const updateProduct = (request, response) => {
    const {id,} = request.params;
    const {
        product_name, product_url, product_image, product_original_weight, product_original_weight_type, product_gram_weight, product_price, product_owner,
    } = request.body;
    ProductServices.updateProduct(
        id, product_name, product_url, product_image, product_original_weight, product_original_weight_type, product_gram_weight, product_price, product_owner
    )
        .then(data => {
            response.status(200).json({
                'msg': `Successfully updated product.`,
                data,
            })
        })
        .catch(e => {
            console.log(e);
            response.status(400).json({
                'msg': `Something went wrong`,
                e,
            });
        });
};

const deleteProduct = (request, response) => {
    const {id,} = request.params;
    ProductServices.deleteProduct(id)
        .then(data => {
            response.status(200).json({
                'msg': `Succesfully deleted product.`,
                data,
            });
        })
        .catch(e => {
            response.status(400).json({
                'msg': `Something went wrong`,
                e,
            });
        });
};

const getProductRouter = _ => {
    const ProductRouter = express.Router();

    ProductRouter.post('/', postProduct);
    ProductRouter.get('/id/:id', getProductByID);
    ProductRouter.put('/:id', updateProduct);
    ProductRouter.delete('/:id', deleteProduct);

    return ProductRouter;
};

module.exports = {
    getProductRouter,
};