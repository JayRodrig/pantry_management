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


const upcomingMealsIngList = async user_id => {
    const weekMealsCall = await axios.get(`http://localhost:11235/mealSchedule/user/${user_id}`);
    const usersCurrPantryCall = await axios.get(`http://localhost:11235/currentPantry/user/${user_id}`);

    const {data: usersCurrPantryArr,} = usersCurrPantryCall.data;
    const {data: weekRecipes,} = weekMealsCall.data;

    let existingIng = {};
    for (let ingredient of usersCurrPantryArr) {
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

    let ingredientsList = {};

    for(let ingredient of necessaryIng) {
        if (!existingIng[ingredient.ingredient_name]) {
            // IF ING DOESN'T EXIST, JUST ADD IT TO THE LIST, DON'T GO FURTHER
            if (ingredientsList[ingredient.ingredient_name]) {
                ingredientsList[ingredient.ingredient_name].needed_weight += ingredient.ingredient_gram_weight;
            } else {
                ingredientsList[ingredient.ingredient_name] = {
                    needed_weight: ingredient.ingredient_gram_weight,
                    weightOnPantry: 0,
                    product_name: ingredient.product_name,
                    product_url: ingredient.product_url,
                    product_price: ingredient.product_price,
                    product_image: ingredient.product_image,
                };
            };
        } else if (existingIng[ingredient.ingredient_name]) {
            // CHECK IF THE WEIGHT ON THE EXISTINGING DICT IS LESSER THAN 
            // THE WEIGHT THAT IS NECESSARY
            if ((existingIng[ingredient.ingredient_name].weight_left - ingredient.ingredient_gram_weight) > 0) {
                // IF ENOUGH WEIGHT EXISTS JUST GO ON
                existingIng[ingredient.ingredient_name].weight_left = existingIng[ingredient.ingredient_name].weight_left - ingredient.ingredient_gram_weight;
                continue;
            } else if (!ingredientsList[ingredient.ingredient_name]) {
                // IF NOT ENOUGH WEIGHT, CREATE A NEW KEY ON THE LIST DICT
                ingredientsList[ingredient.ingredient_name] = {
                    needed_weight: ingredient.ingredient_gram_weight,
                    weightOnPantry: existingIng[ingredient.ingredient_name].weight_left,
                    product_name: ingredient.product_name,
                    product_url: ingredient.product_url,
                    product_price: ingredient.product_price,
                    product_image: ingredient.product_image,
                }
            }
        } else {
            // IF NOT ENOUGH WEIGHT AND KEY ALREADY EXISTS, JUST ADD TO NEEDED WEIGHT
            ingredientsList[ingredient.ingredient_name].needed_weight += ingredient.ingredient_gram_weight;
        };
    };
    return ingredientsList;
};

module.exports = {
    upcomingMealsIngList,
};