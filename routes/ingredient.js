// NPM MODULES
const express = require('express');

// LOCAL MODULES
const IngredientServices = require('../services/ingredient');
const { convertToGrams } = require('../services/weightConversions');

//CREATE NEW INGREDIENT
const createIngredient = (request, response) => {
    const { ingredient_name, recipe_id, product_id, ingredient_weight, ingredient_weight_type } = request.body;
    const ingredient_gram_weight = convertToGrams(ingredient_weight, ingredient_weight_type);
    IngredientServices.createIngredient(ingredient_name, recipe_id, product_id, ingredient_weight, ingredient_weight_type, ingredient_gram_weight)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully added ingredient with ID ${data.id}.`,
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

//GET INGREDIENT BY ID
const getIngredientByID = (request, response) => {
    const { id, } = request.params;
    IngredientServices.getIngredientByID(id)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully retrieved ingredient data.`,
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

//GET INGREDIENT BY NAME
const getIngredientByName = (request, response) => {
    const { name, } = request.params;
    IngredientServices.getIngredientByName(name)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully retrieved ingredient data.`,
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

//GET INGREDIENTS OF RECIPE BY RECIPE ID
const getRecipeIngredients = (request, response) => {
    const { id, } = request.params;
    IngredientServices.getRecipeIngredients(id)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully retrieved ingredients data.`,
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

//UPDATE INGREDIENT BY ID
const updateIngredient = (request, response) => {
    const { ingredient_name, recipe_id, product_id, ingredient_weight, ingredient_weight_type } = request.body;
    const { id } = request.params;
    const ingredient_gram_weight = convertToGrams(ingredient_weight, ingredient_weight_type);
    IngredientServices.updateIngredient(id, ingredient_name, recipe_id, product_id, ingredient_weight, ingredient_weight_type, ingredient_gram_weight)
        .then(() => {
            response.status(200).json({
                'msg': `Successfully updated ingredient with ID ${id}`,
                'data': id
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

//DELETE INGREDIENT BY ID
const deleteIngredient = (request, response) => {
    const { id } = request.params;
    console.log(id)
    IngredientServices.deleteIngredient(id)
        .then(()=> {
            response.status(200).json({
                'msg': `Successfully deleted ingredient with ID ${id}`,
                'data': id
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


const getIngredientRouter = _ => {
    const IngredientRouter = express.Router();

    IngredientRouter.get('/:id', getIngredientByID);
    IngredientRouter.get('/name/:name', getIngredientByName);
    IngredientRouter.get('/recipe/:id', getRecipeIngredients);
    IngredientRouter.post('/', createIngredient);
    IngredientRouter.put('/:id', updateIngredient);
    IngredientRouter.delete('/:id', deleteIngredient);

    return IngredientRouter;
};

module.exports = {
    getIngredientRouter,
};