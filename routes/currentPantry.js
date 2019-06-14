// NPM MODULES
const express = require('express');

// LOCAL MODULES
const CurrentPantryServices = require('../services/currentPantry');

//CREATE ADD PRODUCT TO CURRENT_PANRTY
const createProductInPantry = (request, response) => {
    const { product_id, owner_id, weight_left } = request.body;
    CurrentPantryServices.createProductInPantry(product_id, owner_id, weight_left)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully added product to pantry with weight left of ${data.weight_left}.`,
                data,
            });
        })
        .catch(e => {
            console.log(e)
            response.status(400).json({
                'msg': `Something went wrong.`,
                e,
            });
        });
}

//GET PANTRY ITEM BY ID
const getPantryItemByID = (request, response) => {
    const { id, } = request.params;
    CurrentPantryServices.getPantryItemByID(id)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully retrieved current_pantry data.`,
                data,
            });
        })
        .catch(e => {
            response.status(400).json({
                'msg': `Something went wrong.`,
                e,
            });
        });
};

//GET PANTRY ITEM/ITEMS THAT INCLUDE NAME
const getPantryItemByName = (request, response) => {
    const { name, } = request.params;
    const likeName = `%${name}%`;
    CurrentPantryServices.getPantryItemByName(likeName)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully retrieved current_pantry data.`,
                data,
            });
        })
        .catch(e => {
            response.status(400).json({
                'msg': `Something went wrong.`,
                e,
            });
        });
};

//GET PANTRY ITEMS OF USER BY USER ID
const getPantryItemsOfUser= (request, response) => {
    const { id, } = request.params;
    CurrentPantryServices.getPantryItemsOfUser(id)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully retrieved current_pantry data.`,
                data,
            });
        })
        .catch(e => {
            response.status(400).json({
                'msg': `Something went wrong.`,
                e,
            });
        });
};

//GET PANTRY ITEM/ITEMS THAT INCLUDE NAME FOR SPECIFIC USER
const getPantryItemOfUserByName = (request, response) => {
    const { name, id } = request.params;
    const likeName = `%${name}%`;
    console.log(likeName)
    console.log(id)
    CurrentPantryServices.getPantryItemOfUserByName(likeName, id)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully retrieved current_pantry data.`,
                data,
            });
        })
        .catch(e => {
            response.status(400).json({
                'msg': `Something went wrong.`,
                e,
            });
        });
};


//UPDATE A PRODUCT'S WEIGHT LEFT AFTER PURCHASE BY PRODUCT ID
const updateproductWeightLeft = (request, response) => {
    const { product_id, } = request.params;
    const { newWeight, } = request.body;
    console.log(product_id)
    ProductServices.updateproductWeightLeft(product_id, newWeight)
        .then(data => {
            console.log(data)
            response.status(200).json({
                'msg': `Successfully updated product.`,
                data
            })
        })
        .catch(e => {
            response.status(400);
            response.json({
                'msg': `Something went wrong.`,
                e,
            });
        });
}

const getCurrentPantryRouter = _ => {
    const CurrentPantryRouter = express.Router();

    CurrentPantryRouter.get('/user/:id', getPantryItemsOfUser);
    CurrentPantryRouter.post('/', createProductInPantry);
    CurrentPantryRouter.get('/:id', getPantryItemByID);
    CurrentPantryRouter.get('/name/:name', getPantryItemByName);
    CurrentPantryRouter.get('/user/:id/:name', getPantryItemOfUserByName);
    CurrentPantryRouter.put('/product/:product_id', updateproductWeightLeft);

    return CurrentPantryRouter;
};

module.exports = {
    getCurrentPantryRouter,
};