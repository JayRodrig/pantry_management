/*
    TODO:
        - INPUT VALIDATION
*/

// NPM MODULES
const express = require('express');

// LOCAL MODULES
const UserServices = require('../services/users');

const createUser = (request, response) => {
    const {name, username, email, dob, phone_number} = request.body;
    UserServices.postUser(name, username, email, dob, phone_number)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully created user.`,
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

const getUserRouter = _ => {
    const UserRouter = express.Router();

    UserRouter.post('/', createUser);
    UserRouter.get('/id/:id', getUserByID);
    UserRouter.get('/email/:email', getUserByEmail);

    return UserRouter;
};

module.exports = {
    getUserRouter,
};