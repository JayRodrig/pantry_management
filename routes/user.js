/*
    TODO:
        - INPUT VALIDATION
*/

// NPM MODULES
const express = require('express');

// LOCAL MODULES
const UserServices = require('../services/users');

const createUser = (request, response) => {
    const {name, username, email, dob, phone_number, diet_preference, food_limitations, food_alergies,} = request.body;
    UserServices.postUser(name, username, email, dob, phone_number, diet_preference, food_limitations, food_alergies)
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

const getUserRouter = _ => {
    const UserRouter = express.Router();

    UserRouter.post('/', createUser);
    UserRouter.get('/id/:id', getUserByID);
    UserRouter.get('/email/:email', getUserByEmail);
    UserRouter.put('/:id', updateUser);
    UserRouter.delete('/:id', deleteUser);

    return UserRouter;
};

module.exports = {
    getUserRouter,
};