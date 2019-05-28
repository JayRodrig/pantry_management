const axios = require('axios');
/*
    TODO: 
    INGREDIENT NAME SHOULD MATCH PRODUCT NAME
    IN THE EVENT THE USER PUTS RICE AS THE INGREDIENT
    BUT IT'S EXPECTING A DIFF RICE AND HAS TWO DIFF PRODUCTS
    THE FUNCTION MIGHT PICK UP AN EXISTING RICE ON THE CURR PANTRY
    THAT MIGHT NOT BE NECESSARILY THE TYPE OF RICE THE USER NEEDS 
    AND NOT TELL THE USER THEY NEED THAT SPECIFIC PRODUCT, WHEN THEY ACTUALLY DO

    TO AVOID, ADV USER'S TO EITHER NAME THE INGREDIENTS THE SAME THEIR PRODS ARE NAMED
    OR IF USING A CONSISTENT PROD FOR, LET'S SAY 'RICE', SPECIFY WHEN THEY ACTUALLY WANT 
    A DIFF ONE ON THE RECIPE'S ING

    GIVEN THE OBS UP TOP, CONSIDER MAKING THE INGREDIENTS NAME UNIQUE
    THAT WAY 2 'RICE' ROWS WON'T BE MADE
    USERS WILL HAVE TO NAME THEM DIFF SINCE THEY'LL REPRESENT DIFF PRODUCTS
*/


const getAllWeeklyMeals = async _ => {
    const weekMealsCall = await axios.get('http://pantry-managementbe.herokuapp.com/mealSchedule/user/1');
    const usersCurrPantryCall = await axios.get('http://localhost:11235/currentPantry/user/1');
    // /ingredient/recipe/:id :: recipe.recipe_id

    const {data: usersCurrPantryArr,} = usersCurrPantryCall.data;
    const {data: weekRecipes,} = weekMealsCall.data;

    let existingIng = {};
    for (let ingredient of usersCurrPantryArr) {
        // existingIng = existingIng.concat({
        //     ing_name: ingredient.ingredient_name,
        //     weight_left: ingredient.weight_left,
        //     product_used: ingredient.product_name,
        //     product_img: ingredient.product_image,
        //     product_url: ingredient.product_url
        // });
        if (!existingIng[ingredient.ingredient_name]) {
            existingIng[ingredient.ingredient_name] = {
                weight_left: ingredient.weight_left,
                product_used: ingredient.product_name,
                product_img: ingredient.product_image,
                product_url: ingredient.product_url
            };
        } else {
            continue;
        };
    };

    let necessaryIng = [];
    for (let recipe of weekRecipes) {
        const ingCall = await axios.get(`http://localhost:11235/ingredient/recipe/${recipe.recipe_id}`);
        const {data: recipeIng,} = ingCall.data;
        necessaryIng = necessaryIng.concat(recipeIng);
    };

    console.log('needs... ', necessaryIng);
    console.log('has... ', existingIng);


};

console.log(getAllWeeklyMeals());
// getAllWeeklyMeals();