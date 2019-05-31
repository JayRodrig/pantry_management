// LOCAL MODULES
const { getDbConn, } = require('./db/db');
const { dbAddr, } = require('./db/config');

//ADD SCHEDULED MEAL FOR USER
const createScheduledMeal = (user_id, recipe_id, day_id, date, cooked) => getDbConn(dbAddr).one(
    `   
        INSERT INTO meal_schedule
        (user_id, 
        recipe_id, 
        day_id,
        date,
        cooked) 
        VALUES 
        ($[user_id], 
        $[recipe_id], 
        $[day_id],
        $[date],
        $[cooked]) RETURNING id;`
    , { user_id, recipe_id, day_id, date, cooked }
);

//GET SCHEDULED MEALS FOR SPECIFIC USER ID
const getScheduledMeals = id => getDbConn(dbAddr).any(
    `
    SELECT recipes.*,
           weekday.*
     FROM meal_schedule
     INNER JOIN recipes
        ON recipes.recipe_id = meal_schedule.recipe_id
     INNER JOIN weekday
        ON meal_schedule.day_id = weekday.weekday_id
     WHERE recipes.recipe_owner = $[id]
    `, { id, }
);

//GET SCHEDULED MEAL BY ID
const getAScheduledMeal = (id) => getDbConn(dbAddr).any(
    `
    SELECT recipes.*,
           weekday.*
     FROM meal_schedule
     INNER JOIN recipes
        ON recipes.recipe_id = meal_schedule.recipe_id
     INNER JOIN weekday
        ON meal_schedule.day_id = weekday.weekday_id
     WHERE meal_schedule.id = $[id];
    `, { id, }
);

//UPDATE SCHEDULED MEAL FOR USER
const updateScheduledMeal = ( id, user_id, recipe_id, day_id, date, cooked ) => getDbConn(dbAddr).none(
    `   
        UPDATE meal_schedule
        SET 
        user_id = $[user_id], 
        recipe_id = $[recipe_id], 
        day_id = $[day_id],
        date = $[date],
        cooked = $[cooked]
        WHERE meal_schedule.id = $[id];`
    , { id, user_id, recipe_id, day_id, date, cooked }
);

//DELETE A SCHEDULED MEAL BY ID
const deleteAScheduledMeal = (id) => getDbConn(dbAddr).none(
    `
    DELETE FROM meal_schedule WHERE meal_schedule.id = $[id];
    `, { id, }
);

//DELETE ALL SCHEDULED MEALS FOR USER BY ID
const deleteAllScheduledMealsForUser = (id) => getDbConn(dbAddr).none(
    `
    DELETE FROM meal_schedule WHERE meal_schedule.user_id = $[id];
    `, { id, }
);

module.exports = {
    createScheduledMeal,  
    getScheduledMeals,
    getAScheduledMeal,
    updateScheduledMeal,
    deleteAScheduledMeal,
    deleteAllScheduledMealsForUser,
};