DROP DATABASE IF EXISTS pantry_management;
CREATE DATABASE pantry_management;

\c pantry_management;

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
('Chicken Over Rice', 'None', 1, 'Very tasteful Dominican recipe', 'https://www.bunsinmyoven.com/wp-content/uploads/2019/03/creamy-garlic-chicken-and-rice-500x500.jpg'),
('Beef Over Rice', 'None', 1, 'Very tasteful Dominican recipe', 'https://www.halfbakedharvest.com/wp-content/uploads/2019/02/30-Minute-Vietnamese-Beef-and-Crispy-Rice-Bowl-1-500x500.jpg'),
('Chicken Alfredo', 'None', 2, 'Very tasteful Italian recipe', 'https://www.recipetineats.com/wp-content/uploads/2017/03/One-Pot-Chicken-Alfredo-2-500x500.jpg'),
('Mac and Cheese Pasta', 'None', 1, 'Best mac and cheese ever!', 'https://www.momontimeout.com/wp-content/uploads/2018/10/homemade-mac-and-cheese-recipe-titled-500x500.jpg'),
('Pasta Alfredo', 'None', 1, 'Moms recipe, so yummy', 'https://natashaskitchen.com/wp-content/uploads/2014/02/Creamy-Shrimp-Alfredo-Pasta-5-500x500.jpg'),
('Steak Fajitas', 'None', 1, 'When you are very hungry', 'https://www.isabeleats.com/wp-content/uploads/2018/04/easy-steak-fajitas-small-1-500x500.jpg'),
('Fried Rice', 'None', 1, 'Easy and fast', 'https://www.recipetineats.com/wp-content/uploads/2018/03/Egg-Fried-Rice_5-1-500x500.jpg'),
('Chicken Soup', 'None', 1, 'Healthy yummy soup', 'https://feelgoodfoodie.net/wp-content/uploads/2019/01/Chicken-Lemon-Rice-Soup-8-500x500.jpg'),
('Lentil Soup', 'None', 1, 'My favorite', 'https://www.kitchenkonfidence.com/wp-content/uploads/2019/01/Instant-Pot-Red-Lentil-Soup-3-1-500x500.jpg'),
('Steak Tacos', 'None', 1, 'For Mexican night', 'https://whatshouldimakefor.com/wp-content/uploads/2019/05/IMG_9928-2-500x500.jpg');

INSERT INTO products (product_name, product_url, product_image, product_original_weight, product_original_weight_type, product_gram_weight, product_price, product_owner) VALUES
(
    'Fotune Food Rozana Basmati Rice', 'https://www.amazon.com/Fortune-Rozana-Basmati-Rice-1kg/dp/B00YGMLWQO', 
    'https://www.fortunefoods.com/sites/default/files/rozana-rice.png', '4', 'Pounds', 1814, '11.49', 1
),
(
    'Organic Whole Chicken', 'https://www.amazon.com/Perdue-Harvestland-Organic-Chicken-Giblets/dp/B06XC94RYT/ref=sr_1_17?fpw=fresh&keywords=chicken&qid=1557880034&s=gateway&sr=8-17',
    'https://www.fosterfarms.com/wp-content/uploads/2016/01/3158_443085_ORG_YNGCHCKN_BAG_H.png', '5', 'pound', 2268, '13.76', 1
),
(
    'Grass Fed, Lean Ground Beef', 'https://thesimplegrocer.com/collections/red-meat/products/100-grass-fed-organic-ground-beef-non-gmo',
    'https://mk0pedersonsfarpq8ip.kinstacdn.com/wp-content/uploads/2017/04/Organcic-Ground-Beef-Web.png', '16', 'ounce', 454, '8.24', 1
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
    'Skinner Pasta, Elbows', 'https://www.amazon.com/Skinner-Large-Elbow-Macaroni-Ounce/dp/B00LQY4U8M/ref=sr_1_2?crid=3S7CU65V2QX36&keywords=skinner+large+elbow+noodles&qid=1560564679&s=gateway&sprefix=skinner+elbow+noodl%2Caps%2C124&sr=8-2',
    'https://cdn.skinnerpasta.com/Images/Library/6/Skinner_Large_Elbows_12oz.png', '16', 'ounce', 453.60, '.99', 1
),
(
    'Cabot Cheddar Shred', 'https://www.amazon.com/Cabot-Seriously-Sharp-Cheddar-Cheese/dp/B0089WB6Y0/ref=sr_1_4?fpw=fresh&keywords=cabot+cheddar+shred&qid=1560564710&s=gateway&sr=8-4',
    'https://links.imagerelay.com/cdn/34/ql/50438dd8b6ff4b4ab74fd8cc08f8d390/Cabot_Shreds_FieryJack_8oz_FrontAngle-500x500-0f6d1ffa-a20b-4ce7-a4e1-c720ffcb2b54.png', '12', 'ounce', 340, '4.49', 1
),
(
    'Sargento Shredded Parmesan Cheese', 'https://www.amazon.com/Sargento-Reserve-Shaved-14-Month-Parmesan/dp/B07KBNZPT6/ref=sr_1_fkmr0_1?fpw=fresh&keywords=Sargento+Shredded+Parmesan+Cheese&qid=1560564747&s=amazonfresh&sr=1-1-fkmr0',
    'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_3.0,f_auto,q_auto:low,w_400/26652_sil-shredded-parmesan-sargento-artisan-blends-shredded-parmesan-cheese', '6', 'ounce', 170, '4.69', 1
),
(
    'Barilla Pasta, Linguine', 'https://www.amazon.com/Barilla-Pasta-Linguine-16-Ounce/dp/B000RUNRK8/ref=sr_1_2?crid=3W4K4GVAMO6RF&fpw=fresh&keywords=linguine+pasta&qid=1560020059&s=amazonfresh&sprefix=linguine+%2Camazonfresh%2C643&sr=1-2',
    'https://www.mymarkris.com.au/product/image/medium/3141_1.png', '16', 'ounce', 453.60, '1.69', 1
),
(
    'New York Strip Steak – 100% Grass-Fed', 'https://www.amazon.com/Pre-York-Strip-Steak-Grass-Finished/dp/B01H0AI57M/ref=sr_1_1_sspa?fpw=fresh&keywords=steak&qid=1560020469&s=amazonfresh&sr=1-1-spons&psc=1',
    'http://mertsspecialtymeats.com/wp-content/uploads/2018/01/pre-beef-ribeye-steak-300x242.png', '10', 'ounce', 283, '13.17', 1
),
(
    'Taylor Stir Fry Kit', 'https://www.amazon.com/Taylor-Farms-Ginger-Garlic-Stir/dp/B01LAYXIPI/ref=sr_1_1?crid=168KD0C0DSPQ0&fpw=fresh&keywords=taylor+farms+stir+fry&qid=1560564788&s=gateway&sprefix=taylor+stir+fr%2Camazonfresh%2C127&sr=8-1',
    'https://i5.walmartimages.com/asr/3fd3a848-496d-45be-8b29-586005c045f7_4.88aa07dd8059d1039a53a76ade2da71d.png', '16', 'ounce', 453, '2.49', 1
),
(
    'Organic Yellow Onions', 'https://www.amazon.com/Yellow-Onion-Organic-3-lb/dp/B00E3KSQ8Q/ref=sr_1_1?crid=AQ7O8DEHRQ3U&fpw=fresh&keywords=onions+yellow&qid=1560021123&s=amazonfresh&sprefix=onions%2Camazonfresh%2C1488&sr=1-1',
    'http://pngimg.com/uploads/onion/onion_PNG3821.png', '3', 'pound', 1360, '2.99', 1
),
(
    'Organic Green Onion (Scallions)', 'https://www.amazon.com/Organic-Green-Onion-Scallions-Bunch/dp/B000P6G0RG/ref=sr_1_7?crid=YCINOLRKHWGR&fpw=fresh&keywords=ginger+root&qid=1560021623&s=amazonfresh&sprefix=ginger%2Camazonfresh%2C157&sr=1-7',
    'http://bengardranch.com/wp-content/uploads/2012/03/greenonions_i.png', '.5', 'pound', 226, '1.29', 1
),
(
    'Ginger', 'https://www.amazon.com/produce-aisle-B003IMCNIO-Ginger-oz/dp/B003IMCNIO/ref=sr_1_1?fpw=fresh&keywords=ginger+root&qid=1560021784&s=amazonfresh&sr=1-1',
    'http://www.pngmart.com/files/5/Ginger-PNG-Clipart.png', '8', 'ounce', 226, '3.70', 1
),
(
    'Organic Carrots', 'https://www.amazon.com/produce-aisle-mburring-Organic-Carrots/dp/B000P6G0FI/ref=sr_1_6?crid=79C62QLUCT35&fpw=fresh&keywords=celery+organic&qid=1560024263&s=amazonfresh&sprefix=celer%2Camazonfresh%2C130&sr=1-6',
    'https://purepng.com/public/uploads/large/purepng.com-carrotscarrotvegetablesfreshdeliciousefoodhealthycarrots-481521740717jmglq.png', '2', 'pound', 907, '1.60', 1
),
(
    'Imagine Organic Chicken Broth', 'https://www.amazon.com/Imagine-Organic-Range-Chicken-Sodium/dp/B07979NV39/ref=sr_1_1?fpw=fresh&keywords=Imagine+Organic+Chicken+Broth&qid=1560564819&s=amazonfresh&sr=1-1',
    'https://www.imaginefoods.com/wp-content/uploads/2018/05/IMG_FR_ChickBrothOrg_32oz.png', '32', 'ounce', 907, '1.99', 1
),
(
    'Goya Dry Lentils', 'https://www.amazon.com/Goya-Dry-Lentils-16-oz/dp/B0000DIF38/ref=sr_1_3?crid=2RGRWP1GJSCKL&fpw=fresh&keywords=lentils&qid=1560030264&s=amazonfresh&sprefix=lentl%2Camazonfresh%2C163&sr=1-3',
    'https://www.goya.com/media/1034/lentils-dry.png?width=470', '16', 'ounce', 453, '2.09', 1
),
(
    'Hunts Organic Tomato Sauce', 'https://www.amazon.com/Hunts-Organic-Tomato-Sauce-15/dp/B016SE5D9O/ref=sr_1_2_sspa?crid=H7EZDUA652HR&fpw=fresh&keywords=tomato+sauce&qid=1560030461&s=amazonfresh&sprefix=tomatoe%2Camazonfresh%2C149&sr=1-2-spons&psc=1',
    'https://www.hunts.com/sites/g/files/qyyrlu211/files/images/products/organic-tomato-sauce-40096.png', '15', 'ounce', 400, '2.36', 1
),
(
    'Mission White Corn Tortillas', 'https://www.amazon.com/Mission-Organics-White-Tortillas-Count/dp/B06XJWNH7C/ref=sr_1_1_sspa?fpw=fresh&keywords=Mission+White+Corn+Tortillas&qid=1560564844&s=amazonfresh&sr=1-1-spons&psc=1',
    'https://www.missionfoods.com.au/media/793677/mission_tortillas_whitecorn.png', '1', 'pound', 453, '2.59', 1
);



INSERT INTO current_pantry (product_id, owner_id, weight_left) VALUES
(1, 1, 1100),
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
