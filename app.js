// NPM MODULES
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// LOCAL MODULES
const {authMiddleware,} = require('./services/firebase/authMiddleware');

// EXPRESS ROUTERS
const {getUserRouter,} = require('./routes/user');
const {getRecipeRouter,} = require('./routes/recipe');
const {getProductRouter,} = require('./routes/product');
const {getIngredientRouter,} = require('./routes/ingredient');
const {getCurrentPantryRouter,} = require('./routes/currentPantry');
const {getMealScheduleRouter,} = require('./routes/mealSchedule');
const {getSMSRouter,} = require('./routes/sms')


// FUNCTION THAT RETURNS THE EXPRESS APP / SERVER
const getApp = _ => {
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    app.use('/user', getUserRouter());
    app.use('/recipe', getRecipeRouter());
    app.use('/sms', getSMSRouter());
    app.use('/mealSchedule', getMealScheduleRouter());

    app.use(authMiddleware);

    app.use('/ingredient', getIngredientRouter());
    app.use('/product', getProductRouter());
    app.use('/currentPantry', getCurrentPantryRouter());
    
    return app;
};

module.exports = {
    getApp,
}