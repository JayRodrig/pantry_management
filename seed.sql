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
    recipe_notes VARCHAR,
    recipe_image_url VARCHAR
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
    cooked VARCHAR NOT NULL,
    current_week VARCHAR NOT NULL
);

INSERT INTO weekday (name) VALUES
('Monday'), ('Tuesday'), ('Wednesday'), ('Thursday'), ('Friday');

INSERT INTO users (name, username, email, firebase_uid, dob, phone_number, diet_preference, food_limitations, food_allergies) VALUES
('Jose Rodriguez', 'josemlrod', 'joserodriguez@pursuit.org', 'sampleuid1', '01/01/1990', '6466590036', 'None', 'None', 'None'),
('Heriberto Uroza', 'heriUroza', 'heribertouroza@pursuit.org', 'sampleuid2', '01/01/1990', '7188442946', 'None', 'None', 'None');

INSERT INTO recipes (recipe_name, health_tags, recipe_owner, recipe_notes, recipe_image_url) VALUES
('Chicken Over Rice', 'None', 1, 'Very tasteful Dominican recipe', 'https://images.pexels.com/photos/105588/pexels-photo-105588.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500'),
('Beef Over Rice', 'None', 1, 'Very tasteful Dominican recipe', 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
('Chicken Alfredo', 'None', 2, 'Very tasteful Italian recipe', 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
('Mac and Cheese Pasta', 'None', 1, 'Best mac and cheese ever!', 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'),
('Pasta Alfredo', 'None', 1, 'Moms recipe, so yummy', 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
('Steak Fajitas', 'None', 1, 'When you are very hungry', 'https://images.pexels.com/photos/2098110/pexels-photo-2098110.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
('Fried Rice', 'None', 1, 'Easy and fast', 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
('Chicken Soup', 'None', 1, 'Healthy yummy soup', 'https://images.pexels.com/photos/772518/pexels-photo-772518.png?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500'),
('Lentle Soup', 'None', 1, 'My favorite', 'https://images.pexels.com/photos/724667/pexels-photo-724667.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
('Steak Tacos', 'None', 1, 'For Mexican night', 'https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500');

INSERT INTO products (product_name, product_url, product_image, product_original_weight, product_original_weight_type, product_gram_weight, product_price, product_owner) VALUES
(
    'Lundberg California White Basmati Rice', 'https://www.amazon.com/Lundberg-Family-Farms-Organic-Basmati/dp/B01E6OKVY0/ref=sr_1_3?keywords=organic%2Brice&qid=1557879879&s=gateway&sr=8-3&th=1', 
    'https://images-na.ssl-images-amazon.com/images/I/91U%2Be2ZGLkL._SY679_.jpg', '4', 'Pounds', 1814, '11.49', 1
),
(
    'Organic Whole Chicken', 'https://www.amazon.com/Perdue-Harvestland-Organic-Chicken-Giblets/dp/B06XC94RYT/ref=sr_1_17?fpw=fresh&keywords=chicken&qid=1557880034&s=gateway&sr=8-17',
    'https://images-na.ssl-images-amazon.com/images/I/91KY8eAtn3L._SX522_.jpg', '5', 'pound', 2268, '13.76', 1
),
(
    'Grass Fed, Lean Ground Beef', 'https://www.amazon.com/Pre-Lean-Ground-Beef-Pasture-Raised/dp/B01H0AI4VE/ref=sr_1_4?fpw=fresh&keywords=organic+beef&qid=1557880230&s=amazonfresh&sr=1-4',
    'https://images-na.ssl-images-amazon.com/images/I/81LS2vPN-DL._SX522_.jpg', '16', 'ounce', 454, '8.24', 1
),
(
    'Organic Chicken Breast', 'https://www.amazon.com/Pat-LaFrieda-Organic-Boneless-Skinless/dp/B00N8LTCKM/ref=sr_1_10?fpw=fresh&keywords=organic+chicken+breast&qid=1557880431&s=amazonfresh&sr=1-10',
    'https://images-na.ssl-images-amazon.com/images/I/7129BUea92L._SX522_.jpg', '1.5', 'pound', 680, '15.04', 2
),
(
    'Barilla Pasta Sauce, Creamy Alfredo', 'https://www.amazon.com/Barilla-Pasta-Sauce-Creamy-Alfredo/dp/B01DQXRYUG/ref=sr_1_6?fpw=fresh&keywords=alfredo%2Bsauce&qid=1557880563&s=amazonfresh&sr=1-6&th=1',
    'https://images-na.ssl-images-amazon.com/images/I/51ulslIRdML.jpg', '14.5', 'ounce', 411, '2.85', 2
),
(
    '365 Everyday Value, Elbows', 'https://www.amazon.com/365-Everyday-Value-Elbows-16/dp/B074J684YR/ref=sr_1_7?fpw=fresh&keywords=macaroni+pasta&qid=1560019079&s=gateway&sr=8-7',
    'https://images-na.ssl-images-amazon.com/images/I/61nW2%2B4CQzL._SY606_.jpg', '16', 'ounce', 453.60, '.99', 1
),
(
    '365 Everyday Value, Mild Cheddar Shred', 'https://www.amazon.com/365-Everyday-Value-Cheddar-Shred/dp/B074J7BZCN/ref=sr_1_11?crid=2M0JFKIV4MMZN&fpw=fresh&keywords=cheddar+cheese&qid=1560019434&s=amazonfresh&sprefix=cheddar%2Camazonfresh%2C137&sr=1-11',
    'https://images-na.ssl-images-amazon.com/images/I/61Jdh--TlcL._SX425_.jpg', '12', 'ounce', 340, '4.49', 1
),
(
    'Kraft Finely Shredded Parmesan Cheese', 'https://www.amazon.com/Kraft-Parmesan-Finely-Shredded-Natural/dp/B000Q6B8UY/ref=sr_1_1_sspa?fpw=fresh&keywords=parmesan+cheese&qid=1560019837&s=amazonfresh&sr=1-1-spons&psc=1',
    'https://images-na.ssl-images-amazon.com/images/I/81tMyj5IcFL._SX425_.jpg', '6', 'ounce', 170, '4.69', 1
),
(
    'Barilla Pasta, Linguine', 'https://www.amazon.com/Barilla-Pasta-Linguine-16-Ounce/dp/B000RUNRK8/ref=sr_1_2?crid=3W4K4GVAMO6RF&fpw=fresh&keywords=linguine+pasta&qid=1560020059&s=amazonfresh&sprefix=linguine+%2Camazonfresh%2C643&sr=1-2',
    'https://images-na.ssl-images-amazon.com/images/I/81-1ZPZLyKL._SX425_.jpg', '16', 'ounce', 453.60, '1.69', 1
),
(
    'New York Strip Steak – 100% Grass-Fed', 'https://www.amazon.com/Pre-York-Strip-Steak-Grass-Finished/dp/B01H0AI57M/ref=sr_1_1_sspa?fpw=fresh&keywords=steak&qid=1560020469&s=amazonfresh&sr=1-1-spons&psc=1',
    'https://images-na.ssl-images-amazon.com/images/I/81WeK3vaGwL._SX425_.jpg', '10', 'ounce', 283, '13.17', 1
),
(
    'Birds Eye Pepper Stir Fry Vegetables', 'https://www.amazon.com/Birds-Eye-Pepper-Vegetables-Frozen/dp/B000SKNU0E/ref=sr_1_1_sspa?crid=1I4B2RS9IC6XF&fpw=fresh&keywords=bell+pepper&qid=1560020793&s=amazonfresh&sprefix=bell+pe%2Camazonfresh%2C127&sr=1-1-spons&psc=1',
    'https://images-na.ssl-images-amazon.com/images/I/71cP8hAc%2BRL._SX425_.jpg', '16', 'ounce', 453, '2.49', 1
),
(
    'Organic Yellow Onions', 'https://www.amazon.com/Yellow-Onion-Organic-3-lb/dp/B00E3KSQ8Q/ref=sr_1_1?crid=AQ7O8DEHRQ3U&fpw=fresh&keywords=onions+yellow&qid=1560021123&s=amazonfresh&sprefix=onions%2Camazonfresh%2C1488&sr=1-1',
    'https://images-na.ssl-images-amazon.com/images/I/81sk6a8H9wL._SX425_.jpg', '3', 'pound', 1360, '2.99', 1
),
(
    'Organic Green Onion (Scallions)', 'https://www.amazon.com/Organic-Green-Onion-Scallions-Bunch/dp/B000P6G0RG/ref=sr_1_7?crid=YCINOLRKHWGR&fpw=fresh&keywords=ginger+root&qid=1560021623&s=amazonfresh&sprefix=ginger%2Camazonfresh%2C157&sr=1-7',
    'https://images-na.ssl-images-amazon.com/images/I/71iYcmipTFL._SX425_.jpg', '.5', 'pound', 226, '1.29', 1
),
(
    'Ginger', 'https://www.amazon.com/produce-aisle-B003IMCNIO-Ginger-oz/dp/B003IMCNIO/ref=sr_1_1?fpw=fresh&keywords=ginger+root&qid=1560021784&s=amazonfresh&sr=1-1',
    'https://images-na.ssl-images-amazon.com/images/I/71AF67B5VaL._SX425_.jpg', '8', 'ounce', 226, '3.70', 1
),
(
    'Organic Carrots', 'https://www.amazon.com/produce-aisle-mburring-Organic-Carrots/dp/B000P6G0FI/ref=sr_1_6?crid=79C62QLUCT35&fpw=fresh&keywords=celery+organic&qid=1560024263&s=amazonfresh&sprefix=celer%2Camazonfresh%2C130&sr=1-6',
    'https://images-na.ssl-images-amazon.com/images/I/81pamPQpt8L._SX425_.jpg', '2', 'pound', 907, '1.60', 1
),
(
    '365 Everyday Value, Organic Chicken Broth', 'https://www.amazon.com/365-Everyday-Value-Organic-Chicken/dp/B074VBL8K3/ref=sr_1_21?crid=79C62QLUCT35&fpw=fresh&keywords=celery+organic&qid=1560024548&s=amazonfresh&sprefix=celer%2Camazonfresh%2C130&sr=1-21',
    'https://images-na.ssl-images-amazon.com/images/I/61%2BgB1zkn0L._SY679_.jpg', '32', 'ounce', 907, '1.99', 1
),
(
    'Goya Dry Lentils', 'https://www.amazon.com/Goya-Dry-Lentils-16-oz/dp/B0000DIF38/ref=sr_1_3?crid=2RGRWP1GJSCKL&fpw=fresh&keywords=lentils&qid=1560030264&s=amazonfresh&sprefix=lentl%2Camazonfresh%2C163&sr=1-3',
    'https://images-na.ssl-images-amazon.com/images/I/91671geZkqL._SX425_.jpg', '16', 'ounce', 453, '2.09', 1
),
(
    'Hunts Organic Tomato Sauce', 'https://www.amazon.com/Hunts-Organic-Tomato-Sauce-15/dp/B016SE5D9O/ref=sr_1_2_sspa?crid=H7EZDUA652HR&fpw=fresh&keywords=tomato+sauce&qid=1560030461&s=amazonfresh&sprefix=tomatoe%2Camazonfresh%2C149&sr=1-2-spons&psc=1',
    'https://images-na.ssl-images-amazon.com/images/I/81tvYgCpAnL._SX425_.jpg', '15', 'ounce', 400, '2.36', 1
),
(
    'Guerrero White Corn Tortillas', 'https://www.amazon.com/Guerrero-5-75-Inch-White-Tortillas/dp/B001MSTPCS/ref=sr_1_3?fpw=fresh&keywords=corn+tortillas&qid=1560030911&s=amazonfresh&sr=1-3',
    'https://images-na.ssl-images-amazon.com/images/I/711ejbnjXcL._SY550_.jpg', '1', 'pound', 453, '2.59', 1
);

INSERT INTO current_pantry (product_id, owner_id, weight_left) VALUES
(1, 1, 1814),
(2, 1, 2268),
(3, 1, 454),
(4, 2, 680),
(5, 2, 411),
(6, 1, 400),
(7, 1, 340),
(8, 1, 170),
(9, 1, 300),
(10, 1, 283),
(11, 1, 0),
(12, 1, 500),
(13, 1, 100),
(14, 1, 100),
(15, 1, 0),
(16, 1, 800),
(17, 1, 0),
(18, 1, 0),
(19, 1, 0);

INSERT INTO ingredients (ingredient_name, recipe_id, product_id, ingredient_weight, ingredient_weight_type, ingredient_gram_weight) VALUES
('Rice', 1, 1, 3,'cups', 500),
('Chicken', 1, 2, 2,'pounds', 907),
('Rice', 2, 1, 3,'cups', 500),
('Beef', 2, 3, 10,'onces', 283),
('Chicken Breast', 3, 4, 0.5,'pounds', 227),
('Alfredo Sauce', 3, 5, 5, 'ounces', 142),
('Macaroni', 4, 6, 5, 'ounces', 142),
('Cheddar Cheese', 4, 7, 5, 'ounces', 142),
('Alfredo Sauce', 5, 5, 10, 'ounces', 284),
('Parmesan Cheese', 5, 8, 5, 'ounces', 142),
('Linguine Pasta', 5, 9, 8, 'ounces', 227),
('New York Strip Steak', 6, 10, 8, 'ounces', 227),
('Bell Peppers', 6, 11, 5, 'ounces', 142),
('Onions', 6, 12, .25, 'pound', 113),
('Rice', 7, 1, 3,'cups', 500),
('Onions', 7, 12, .25, 'pound', 113),
('Scallions', 7, 13, .25, 'pound', 113),
('Ginger', 7, 14, 1, 'ounce', 28),
('Chicken', 8, 2, 2,'pounds', 907),
('Onions', 8, 12, .25, 'pound', 113),
('Carrots', 8, 15, .5, 'pound', 226),
('Chicken broth', 8, 16, 16, 'pound', 303),
('Lentils', 9, 17, 16, 'ounce', 200),
('Onions', 9, 12, .25, 'pound', 113),
('Tomato Sauce', 9, 18, 8, 'ounce', 227),
('Chicken broth', 9, 16, 16, 'pound', 303),
('New York Strip Steak', 10, 10, 8, 'ounces', 227),
('Onions', 10, 12, .25, 'pound', 113),
('Tortillas', 10, 19, .25, 'pound', 113);

INSERT INTO meal_schedule (user_id, recipe_id, day_id, date, cooked, current_week) VALUES
(1, 1, 1, 'June 03, 2019', 'false', 'true'),
(1, 2, 4, 'June 04, 2019', 'false', 'true'),
(2, 3, 3, 'June 03, 2019', 'false', 'true'),
(1, 10, 1, 'June 05, 2019', 'false', 'true'),
(1, 4, 1, 'June 06, 2019', 'false', 'true'),
(1, 5, 1, 'June 07, 2019', 'false', 'true');