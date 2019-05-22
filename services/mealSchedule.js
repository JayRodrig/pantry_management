// LOCAL MODULES
const { getDbConn, } = require('./db/db');
const { dbAddr, } = require('./db/config');

//CREATE PRODUCT
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


module.exports = {
    createScheduledMeal,  
};