// LOCAL MODULES
const { getDbConn, } = require('./db/db');
const { dbAddr, } = require('./db/config');

//ADD SCHEDULED MEAL FOR USER
const createScheduledMeal = (user_id, recipe_id, day_id) => getDbConn(dbAddr).one(
    `   
        INSERT INTO meal_schedule
        (user_id, 
        recipe_id, 
        day_id) 
        VALUES 
        ($[user_id], 
        $[recipe_id], 
        $[day_id]) RETURNING id;`
    , { user_id, recipe_id, day_id }
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
     WHERE meal_schedule.id = $[id]
    `, { id, }
);


module.exports = {
    createScheduledMeal,  
    getScheduledMeals,
    getAScheduledMeal,
};