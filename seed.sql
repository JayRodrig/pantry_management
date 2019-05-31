DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS current_pantry CASCADE;
DROP TABLE IF EXISTS ingredients CASCADE;
DROP TABLE IF EXISTS weekday CASCADE;
DROP TABLE IF EXISTS meal_schedule CASCADE;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR,
    username VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    firebase_uid VARCHAR UNIQUE NOT NULL,
    dob VARCHAR,
    phone_number VARCHAR UNIQUE NOT NULL,
    diet_preference VARCHAR,
    food_limitations VARCHAR,
    food_allergies VARCHAR
);

CREATE TABLE recipes (
    recipe_id SERIAL PRIMARY KEY,
    recipe_name VARCHAR UNIQUE NOT NULL,
    health_tags VARCHAR NOT NULL,
    recipe_owner INT REFERENCES users(user_id) ON DELETE CASCADE,
    recipe_notes VARCHAR
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR NOT NULL,
    product_url VARCHAR,
    product_image VARCHAR,
    product_original_weight VARCHAR NOT NULL,
    product_original_weight_type VARCHAR NOT NULL,
    product_gram_weight INT NOT NULL,
    product_price VARCHAR NOT NULL,
    product_owner INT REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE current_pantry (
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    owner_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    weight_left INT NOT NULL
);

CREATE TABLE ingredients (
    ingredient_id SERIAL PRIMARY KEY,
    ingredient_name VARCHAR NOT NULL,
    recipe_id INT REFERENCES recipes(recipe_id) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    ingredient_weight INT NOT NULL,
    ingredient_weight_type VARCHAR NOT NULL,
    ingredient_gram_weight INT NOT NULL
);

CREATE TABLE weekday (
    weekday_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE meal_schedule (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    recipe_id INT REFERENCES recipes(recipe_id) ON DELETE CASCADE,
    day_id INT REFERENCES weekday(weekday_id) ON DELETE CASCADE,
    date VARCHAR NOT NULL,
    cooked VARCHAR NOT NULL
);

INSERT INTO weekday (name) VALUES
('Monday'), ('Tuesday'), ('Wednesday'), ('Thursday'), ('Friday');

INSERT INTO users (name, username, email, firebase_uid, dob, phone_number, diet_preference, food_limitations, food_allergies) VALUES
('Jose Rodriguez', 'josemlrod', 'joserodriguez@pursuit.org', 'sampleuid', '01/01/1990', '1234567890', 'None', 'None', 'None'),
('Heriberto Uroza', 'heriUroza', 'heribertouroza@pursuit.org', 'sampleuid', '01/01/1990', '0987654321', 'None', 'None', 'None');

INSERT INTO recipes (recipe_name, health_tags, recipe_owner, recipe_notes) VALUES
('Chicken Over Rice', 'None', 1, 'Very tasteful Dominican recipe.'),
('Beef Over Rice', 'None', 1, 'Very tasteful Dominican recipe.'),
('Chicken Alfredo', 'None', 2, 'Very tasteful Italian recipe.');

INSERT INTO products (product_name, product_url, product_image, product_original_weight, product_original_weight_type, product_gram_weight, product_price, product_owner) VALUES
(
    'Lundberg California White Basmati Rice', 'https://www.amazon.com/Lundberg-Family-Farms-Organic-Basmati/dp/B01E6OKVY0/ref=sr_1_3?keywords=organic%2Brice&qid=1557879879&s=gateway&sr=8-3&th=1', 
    'https://images-na.ssl-images-amazon.com/images/I/91U%2Be2ZGLkL._SY679_.jpg', '4', 'Pounds', 1814, '11.49', 1
),
(
    'Organic Whole Chicken', 'https://www.amazon.com/Perdue-Harvestland-Organic-Chicken-Giblets/dp/B06XC94RYT/ref=sr_1_17?fpw=fresh&keywords=chicken&qid=1557880034&s=gateway&sr=8-17',
    'https://images-na.ssl-images-amazon.com/images/I/91KY8eAtn3L._SX522_.jpg', '5', 'lb', 2268, '13.76', 1
),
(
    'Grass Fed, Lean Ground Beef', 'https://www.amazon.com/Pre-Lean-Ground-Beef-Pasture-Raised/dp/B01H0AI4VE/ref=sr_1_4?fpw=fresh&keywords=organic+beef&qid=1557880230&s=amazonfresh&sr=1-4',
    'https://images-na.ssl-images-amazon.com/images/I/81LS2vPN-DL._SX522_.jpg', '16', 'oz', 454, '8.24', 1
),
(
    'Organic Chicken Breast', 'https://www.amazon.com/Pat-LaFrieda-Organic-Boneless-Skinless/dp/B00N8LTCKM/ref=sr_1_10?fpw=fresh&keywords=organic+chicken+breast&qid=1557880431&s=amazonfresh&sr=1-10',
    'https://images-na.ssl-images-amazon.com/images/I/7129BUea92L._SX522_.jpg', '1.5', 'lb', 680, '15.04', 2
),
(
    'Barilla Pasta Sauce, Creamy Alfredo', 'https://www.amazon.com/Barilla-Pasta-Sauce-Creamy-Alfredo/dp/B01DQXRYUG/ref=sr_1_6?fpw=fresh&keywords=alfredo%2Bsauce&qid=1557880563&s=amazonfresh&sr=1-6&th=1',
    'https://images-na.ssl-images-amazon.com/images/I/51ulslIRdML.jpg', '14.5', 'oz', 411, '2.85', 2
);

INSERT INTO current_pantry (product_id, owner_id, weight_left) VALUES
(1, 1, 1814),
(2, 1, 2268),
(3, 1, 454),
(4, 2, 680),
(5, 2, 411);

INSERT INTO ingredients (ingredient_name, recipe_id, product_id, ingredient_weight, ingredient_weight_type, ingredient_gram_weight) VALUES
('Rice', 1, 1, 3,'cups', 500),
('Chicken', 1, 2, 2, 'pounds', 907),
('Rice', 2, 1, 3,'cups', 500),
('Beef', 2, 3, 10,'onces', 283),
('Chicken Breast', 3, 4, 0.5,'pounds', 227),
('Alfredo Sauce', 3, 5, 5, 'ounces', 142);

INSERT INTO meal_schedule (user_id, recipe_id, day_id, date, cooked) VALUES
(1, 1, 1, '06/03/2019', 'false'),
(1, 2, 4, '06/04/2019', 'false'),
(2, 3, 3, '06/03/2019', 'false');