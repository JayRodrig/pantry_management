/*
    TODO: 
        - INPUT VALIDATION
*/

// NPM MODULES
const express = require('express');

// LOCAL MODULES
const RecipeServices = require('../services/recipes');

const postRecipe = (request, response) => {
    const {recipe_name, health_tags, recipe_owner, recipe_notes,} = request.body;
    RecipeServices.postRecipe(recipe_name, health_tags, recipe_owner, recipe_notes)
        .then(data=> {
            response.status(200).json({
                'msg': `Successfully created recipe`,
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

//GET ALL RECIPES FOR A USER BY USER ID
const getRecipesByUserID = (request, response) => {
    const user_id = request.params.id;
    RecipeServices.getRecipesByUserID(user_id)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully retrieved recipes data.`,
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

const updateRecipe = (request, response) => {
    const {id,} = request.params;
    const {recipe_name, health_tags, recipe_owner, recipe_notes,} = request.body;
    RecipeServices.updateRecipe(id, recipe_name, health_tags, recipe_owner, recipe_notes)
        .then(data=> {
            response.status(200).json({
                'msg': `Successfully updated recipe`,
                data,
            });
        })
        .catch(e => {
            console.log(e);
            response.status(400).json({
                'msg': `Something went wrong`,
                e,
            });
        });
};

const deleteRecipe = (request, response) => {
    const {id,} = request.params;
    RecipeServices.deleteRecipe(id)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully deleted recipe`,
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

const getRecipeRouter = _ => {
    const RecipeRouter = express.Router();

    RecipeRouter.post('/', postRecipe);
    RecipeRouter.get('/:id', getRecipeByID);
    RecipeRouter.get('/user/:id', getRecipesByUserID);
    RecipeRouter.put('/:id', updateRecipe);
    RecipeRouter.delete('/:id', deleteRecipe);

    return RecipeRouter;
};

module.exports = {
    getRecipeRouter,
};