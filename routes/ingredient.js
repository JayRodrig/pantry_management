// NPM MODULES
const express = require('express');

// LOCAL MODULES
const IngredientServices = require('../services/ingredient');
const { convertToGrams } = require('../services/weightConversions');

//CREATE NEW INGREDIENT
const createIngredient = (request, response) => {
    const { ingredient_name, recipe_id, product_id, ingredient_weight, ingredient_weight_type } = request.body;
    console.log(request.body)
    const ingredient_gram_weight = convertToGrams(ingredient_weight, ingredient_weight_type);
    IngredientServices.createIngredient(ingredient_name, recipe_id, product_id, ingredient_weight, ingredient_weight_type, ingredient_gram_weight)
        .then(data => {
            console.log(data);
            response.status(200).json({
                'msg': `Successfully retrieved user data.`,
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

//GET INGREDIENT BY NAME
const getIngredientByName = (request, response) => {
    const { name, } = request.params;
    IngredientServices.getIngredientByName(name)
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
    IngredientRouter.get('/name/:name', getIngredientByName);

    return IngredientRouter;
};

const createIngredientRouter = _ => {
    const IngredientRouter = express.Router();

    IngredientRouter.post('/', createIngredient);

    return IngredientRouter;
};

module.exports = {
    getIngredientRouter,
    createIngredientRouter,
};