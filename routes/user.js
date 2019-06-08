/*
    TODO:
        - INPUT VALIDATION
*/

// NPM MODULES
const express = require('express');
const axios = require('axios');

// LOCAL MODULES
const UserServices = require('../services/users');
const CurrentPantryServices = require('../services/currentPantry');
const {authMiddleware,} = require('../services/firebase/authMiddleware');
const {upcomingMealsIngList,} = require('../services/shopping_list');

const createUser = (request, response) => {
    const {name, username, email, firebase_uid, dob, phone_number, diet_preference, food_limitations, food_allergies,} = request.body;
    UserServices.postUser(name, username, email, firebase_uid, dob, phone_number, diet_preference, food_limitations, food_allergies)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully created user.`,
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

const getUserByID = (request, response) => {
    const {id,} = request.params;
    UserServices.getUserByID(id)
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

const getUserByEmail = (request, response) => {
    const {email,} = request.params;
    UserServices.getUserByEmail(email)
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

const updateUser = (request, response) => {
    const {id,} = request.params;
    const {name, username, email, dob, phone_number, diet_preference, food_limitations, food_alergies,} = request.body;
    UserServices.updateUser(id, name, username, email, dob, phone_number, diet_preference, food_limitations, food_alergies)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully updated user`,
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

const deleteUser = (request, response) => {
    const {id,} = request.params;
    UserServices.deleteUser(id)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully deleted user`,
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

const recipesByPantry = (request, response) => {
    const {email,} = request.params;
    UserServices.getUserByEmail(email)
        .then(async data => {
            const {user_id,} = data;
            const pantryItems = await CurrentPantryServices.getPantryItemsOfUser(user_id);
            let baseAPIURL = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=`;
            for (let i = 0; i < pantryItems.length; i++) {
                const ingredientStr = `${pantryItems[i].weight_left} grams of ${pantryItems[i].product_name}`
                if (i < pantryItems.length - 1) {
                    baseAPIURL += `${ingredientStr}%2C`;
                } else {
                    baseAPIURL += ingredientStr;
                };
            };
            const recipes = await axios({
                method: 'get',
                url: baseAPIURL,
                headers: {
                    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                    'X-RapidAPI-Key': '152e0cdc26msh98d504390075f2dp1eeb72jsn4ab228d3c452',
                },
            });
            response.status(200).json({
                'msg': `Successfully retrieved recipes.`,
                pantryItems,
                recipes: recipes.data,
            }); 
        })
        .catch(e => {
            response.status(400).json({
                'msg': `Something went wrong`,
                e,
            });
        });
};

const getUpcomingMealsIngList = async (request, response) => {
    const {user_id,} = request.params;
    const ingredientsList = await upcomingMealsIngList(user_id);
    response.status(200).json({
        'msg': `Successfully retrieved users upcoming meals ingredient list`,
        data: ingredientsList,
    });
};

const getUserRouter = _ => {
    const UserRouter = express.Router();

    UserRouter.post('/', createUser);
    // UserRouter.use(authMiddleware);
    UserRouter.get('/id/:id', getUserByID);
    UserRouter.get('/email/:email', getUserByEmail);
    UserRouter.get('/recipebypantry/:email', recipesByPantry);
    UserRouter.get('/upcomingIngList/:user_id', getUpcomingMealsIngList);
    UserRouter.put('/:id', updateUser);
    UserRouter.delete('/:id', deleteUser);

    return UserRouter;
};

module.exports = {
    getUserRouter,
};