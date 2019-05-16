/*
    TODO:
        - INPUT VALIDATION
*/

// NPM MODULES
const express = require('express');

// LOCAL MODULES
const ProductServices = require('../services/products');

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

    return ProductRouter;
};

module.exports = {
    getProductRouter,
};