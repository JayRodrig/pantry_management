// LOCAL MODULES
const { getDbConn, } = require('./db/db');
const { dbAddr, } = require('./db/config');

//ADD SCHEDULED MEAL FOR USER
const createScheduledMeal = (user_id, recipe_id, day_id, date, cooked, current_week) => getDbConn(dbAddr).one(
    `   
        INSERT INTO meal_schedule
        (user_id, 
        recipe_id, 
        day_id,
        date,
        cooked,
        current_week) 
        VALUES 
        ($[user_id], 
        $[recipe_id], 
        $[day_id],
        $[date],
        $[cooked],
        $[current_week]) RETURNING id;`
    , { user_id, recipe_id, day_id, date, cooked, current_week }
);

//GET SCHEDULED MEALS FOR SPECIFIC USER ID
const getAllScheduledMeals = () => getDbConn(dbAddr).any(
    `
    SELECT recipes.*,
 		meal_schedule.day_id,
 		meal_schedule.current_week,
 		meal_schedule.date,
 		meal_schedule.cooked,
 		meal_schedule.id AS meal_schedule_id
     FROM recipes
     JOIN meal_schedule
        ON recipes.recipe_id = meal_schedule.recipe_id
    `
)

//GET ALL CURRENT SCHEDULE MEALS BY STATUS
const getCurrentScheduledMeals = (status) => getDbConn(dbAddr).any(
    `
    SELECT recipes.*,
 		meal_schedule.day_id,
 		meal_schedule.current_week,
 		meal_schedule.date,
 		meal_schedule.cooked,
 		meal_schedule.id AS meal_schedule_id
     FROM recipes
     JOIN meal_schedule
        ON recipes.recipe_id = meal_schedule.recipe_id
     WHERE meal_schedule.current_week = $[status]  
    `,{ status }
)

//GET ALL SCHEDULE MEALS THAT CURRENT_WEEK IS TRUE BY USER ID
const getCurrWeekTrueByUserID = (user_id) => getDbConn(dbAddr).any(
    `
    SELECT recipes.*,
 		meal_schedule.day_id,
 		meal_schedule.current_week,
 		meal_schedule.date,
 		meal_schedule.cooked,
 		meal_schedule.id AS meal_schedule_id
     FROM recipes
     JOIN meal_schedule
        ON recipes.recipe_id = meal_schedule.recipe_id
     WHERE meal_schedule.current_week = 'true' AND meal_schedule.user_id = $[user_id]
    `,{ user_id }
)

//GET SCHEDULED MEALS FOR SPECIFIC USER ID
const getScheduledMeals = user_id => getDbConn(dbAddr).any(
    `
    SELECT recipes.*,
           weekday.*,
           meal_schedule.current_week,
           meal_schedule.date,
           meal_schedule.cooked,
           meal_schedule.id AS meal_schedule_id
     FROM meal_schedule
     INNER JOIN recipes
        ON recipes.recipe_id = meal_schedule.recipe_id
     INNER JOIN weekday
        ON meal_schedule.day_id = weekday.weekday_id
     WHERE recipes.recipe_owner = $[user_id]
    `, { user_id, }
);

//GET SCHEDULED MEAL BY ID
const getAScheduledMeal = (id) => getDbConn(dbAddr).any(
    `
    SELECT recipes.*,
           weekday.*,
           meal_schedule.current_week,
           meal_schedule.date,
           meal_schedule.cooked,
           meal_schedule.id AS meal_schedule_id
     FROM meal_schedule
     INNER JOIN recipes
        ON recipes.recipe_id = meal_schedule.recipe_id
     INNER JOIN weekday
        ON meal_schedule.day_id = weekday.weekday_id
     WHERE meal_schedule.id = $[id];
    `, { id, }
);

const getMealsFromRange = (user_id, fromDate, toDate) => getDbConn(dbAddr).any(
    `
        SELECT  recipes.*,
                weekday.*,
                meal_schedule.current_week,
                meal_schedule.date,
                meal_schedule.cooked,
                meal_schedule.id AS meal_schedule_id
        FROM meal_schedule
        INNER JOIN recipes
           ON recipes.recipe_id = meal_schedule.recipe_id
        INNER JOIN weekday
           ON meal_schedule.day_id = weekday.weekday_id
        WHERE meal_schedule.date BETWEEN $[fromDate] AND $[toDate] AND meal_schedule.user_id = $[user_id];
    `, {user_id, fromDate, toDate}
)

//UPDATE SCHEDULED MEAL FOR USER
const updateScheduledMeal = ( id, user_id, recipe_id, day_id, date, cooked, current_week ) => getDbConn(dbAddr).none(
    `   
        UPDATE meal_schedule
        SET 
        user_id = $[user_id], 
        recipe_id = $[recipe_id], 
        day_id = $[day_id],
        date = $[date],
        cooked = $[cooked],
        current_week = $[current_week]
        WHERE meal_schedule.id = $[id];`
    , { id, user_id, recipe_id, day_id, date, cooked, current_week }
);

//UPDATE CURRENT_WEEK FROM TRUE TO FALSE AND VISE VERSA
const updateCurrentScheduledMeals = ( current_week, changeFrom ) => getDbConn(dbAddr).none(
    `   
    UPDATE meal_schedule
    SET 
    current_week = $[current_week]
    WHERE meal_schedule.current_week = $[changeFrom];`
    , { current_week, changeFrom }
);

//UPDATE CURRENT_WEEK FROM FALSE TO TRUE WHERE DATE MATCHES A RANGE
const updateCurrentScheduledMealsToTrue = ( fromDate, toDate ) => getDbConn(dbAddr).none(
    `   
    UPDATE meal_schedule
    SET 
    current_week = 'true'
    WHERE meal_schedule.date BETWEEN $[fromDate] AND $[toDate];`
    , { fromDate, toDate }
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
    getMealsFromRange,
    updateScheduledMeal,
    deleteAScheduledMeal,
    deleteAllScheduledMealsForUser,
    getAllScheduledMeals,
    getCurrentScheduledMeals,
    updateCurrentScheduledMeals,
    updateCurrentScheduledMealsToTrue,
    getCurrWeekTrueByUserID,
};