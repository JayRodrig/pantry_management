/*
    TODO: 
        - INPUT VALIDATION
*/

// NPM MODULES
const express = require('express');

// LOCAL MODULES
const RecipeServices = require('../services/recipes');

const getRecipeByID = (request, response) => {
    const {id,} = request.params;
    RecipeServices.getRecipeByID(id)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully retrieved recipe data.`,
                data,
            });
        })
        .catch(e => {
            response.status(400).json({
                'msg': `Something went wrong`,
                'err': e.toString(),
            });
        });
};

const getRecipeRouter = _ => {
    const RecipeRouter = express.Router();

    RecipeRouter.get('/:id', getRecipeByID);

    return RecipeRouter;
};

module.exports = {
    getRecipeRouter,
}