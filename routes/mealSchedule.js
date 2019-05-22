// NPM MODULES
const express = require('express');

// LOCAL MODULES
const MealScheduleServices = require('../services/mealSchedule');

//ADD SCHEDULED MEAL FOR USER
const createScheduledMeal = (request, response) => {
    const { user_id, recipe_id, day_id } = request.body;
    MealScheduleServices.createScheduledMeal(user_id, recipe_id, day_id)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully scheduled meal with ID ${data.id}.`,
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
};

//GET ALL SCHEDULED MEALS FOR A SPECIFIC USER
const getScheduledMeals = (request, response) => {
    const { id } = request.params;
    MealScheduleServices.getScheduledMeals(id)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully retrieved meal_schedule data for user with ID ${id}.`,
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
};

const getMealScheduleRouter = _ => {
    const MealScheduleRouter = express.Router();

    MealScheduleRouter.post('/', createScheduledMeal);
    MealScheduleRouter.get('/user/:id', getScheduledMeals);

    return MealScheduleRouter;
};

module.exports = {
    getMealScheduleRouter,
};