// NPM MODULES
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// FUNCTION THAT RETURNS THE EXPRESS APP / SERVER
const getApp = _ => {
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    return app;
};

module.exports = {
    getApp,
}