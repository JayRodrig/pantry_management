// NPM MODULES
const express = require('express');

// LOCAL MODULES
const IngredientServices = require('../services/ingredient');

const getIngredientByID = (request, response) => {
    const {id,} = request.params;
    IngredientServices.getIngredientByID(id)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully retrieved user data.`,
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



const getIngredientRouter = _ => {
    const IngredientRouter = express.Router();

    IngredientRouter.get('/:id', getIngredientByID);

    return IngredientRouter;
};

module.exports = {
    getIngredientRouter,
};