// NPM MODULES
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// EXPRESS ROUTERS
const {getUserRouter,} = require('./routes/user');
const {getRecipeRouter,} = require('./routes/recipe');
const {getProductRouter,} = require('./routes/product');

// FUNCTION THAT RETURNS THE EXPRESS APP / SERVER
const getApp = _ => {
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    app.use('/user', getUserRouter());
    app.use('/recipe', getRecipeRouter());
    app.use('/product', getProductRouter());

    return app;
};

module.exports = {
    getApp,
}