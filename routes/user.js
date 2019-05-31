/*
    TODO:
        - INPUT VALIDATION
*/

// NPM MODULES
const express = require('express');
const axios = require('axios');

// LOCAL MODULES
const UserServices = require('../services/users');
const CurrentPantryServices = require('../services/currentPantry');

const createUser = (request, response) => {
    const {name, username, email, firebase_uid, dob, phone_number, diet_preference, food_limitations, food_allergies,} = request.body;
    UserServices.postUser(name, username, email, firebase_uid, dob, phone_number, diet_preference, food_limitations, food_allergies)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully created user.`,
                data,
            });
        })
        .catch(e => {
            console.log(e);
            response.status(400).json({
                'msg': `Something went wrong`,
                e,
            });
        });
};

const getUserByID = (request, response) => {
    const {id,} = request.params;
    UserServices.getUserByID(id)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully retrieved user data.`,
                data,
            });
        })
        .catch(e => {
            response.status(400).json({
                'msg': `Something went wrong.`,
                e,
            });
        });
};

const getUserByEmail = (request, response) => {
    const {email,} = request.params;
    UserServices.getUserByEmail(email)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully retrieved user data.`,
                data,
            });
        })
        .catch(e => {
            response.status(400).json({
                'msg': `Something went wrong.`,
                e,
            });
        });
};

const updateUser = (request, response) => {
    const {id,} = request.params;
    const {name, username, email, dob, phone_number, diet_preference, food_limitations, food_alergies,} = request.body;
    UserServices.updateUser(id, name, username, email, dob, phone_number, diet_preference, food_limitations, food_alergies)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully updated user`,
                data,
            });
        })
        .catch(e => {
            console.log(e);
            response.status(400).json({
                'msg': `Something went wrong`,
                e,
            });
        });
};

const deleteUser = (request, response) => {
    const {id,} = request.params;
    UserServices.deleteUser(id)
        .then(data => {
            response.status(200).json({
                'msg': `Successfully deleted user`,
                data,
            });
        })
        .catch(e => {
            response.status(400).json({
                'msg': `Something went wrong`,
                e,
            });
        });
};

const recipesByPantry = (request, response) => {
    const {email,} = request.params;
    UserServices.getUserByEmail(email)
        .then(async data => {
            const {user_id,} = data;
            const pantryItems = await CurrentPantryServices.getPantryItemsOfUser(user_id);
            let baseAPIURL = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=`;
            for (let i = 0; i < pantryItems.length; i++) {
                const ingredientStr = `${pantryItems[i].weight_left} grams of ${pantryItems[i].product_name}`
                if (i < pantryItems.length - 1) {
                    baseAPIURL += `${ingredientStr}%2C`;
                } else {
                    baseAPIURL += ingredientStr;
                };
            };
            const recipes = await axios({
                method: 'get',
                url: baseAPIURL,
                headers: {
                    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                    'X-RapidAPI-Key': '152e0cdc26msh98d504390075f2dp1eeb72jsn4ab228d3c452',
                },
            });
            response.status(200).json({
                'msg': `Successfully retrieved recipes.`,
                pantryItems,
                recipes: recipes.data,
            }); 
        })
        .catch(e => {
            response.status(400).json({
                'msg': `Something went wrong`,
                e,
            });
        });
};

const getUserRouter = _ => {
    const UserRouter = express.Router();

    UserRouter.post('/', createUser);
    UserRouter.get('/id/:id', getUserByID);
    UserRouter.get('/email/:email', getUserByEmail);
    UserRouter.get('/recipebypantry/:email', recipesByPantry)
    UserRouter.put('/:id', updateUser);
    UserRouter.delete('/:id', deleteUser);

    return UserRouter;
};

module.exports = {
    getUserRouter,
};

// {user: P, credential: null, additionalUserInfo: Wf, operationType: "signIn"}
// additionalUserInfo: Wf
// isNewUser: true
// providerId: "password"
// __proto__: Object
// credential: null
// operationType: "signIn"
// user: P
// A: ml {h: ƒ, i: ƒ, g: ƒ, c: 30000, f: 960000, …}
// G: []
// I: true
// N: [ƒ]
// O: []
// Qb: P {G: Array(0), l: "AIzaSyBIS8BFD8aWDObqmVMQC5FmGJePqhAbYZQ", o: "[DEFAULT]", u: "ppantry-d0edc.firebaseapp.com", c: bi, …}
// V: ƒ ()
// Va: null
// W: sm {l: false, settings: il, app: FirebaseAppImpl, c: bi, N: Array(0), …}
// X: sm {l: false, settings: il, app: FirebaseAppImpl, c: bi, N: Array(0), …}
// a: Qk {i: {…}, u: 0, A: "ppantry-d0edc.firebaseapp.com", l: "AIzaSyBIS8BFD8aWDObqmVMQC5FmGJePqhAbYZQ", o: "[DEFAULT]", …}
// ba: gm {a: "AIzaSyBIS8BFD8aWDObqmVMQC5FmGJePqhAbYZQ:[DEFAULT]", b: ck}
// c: bi {b: "AIzaSyBIS8BFD8aWDObqmVMQC5FmGJePqhAbYZQ", i: "https://securetoken.googleapis.com/v1/token", m: Me, f: {…}, g: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/", …}
// displayName: null
// email: "yes@yes.com"
// emailVerified: false
// h: pl {f: bi, a: "AEu4IL2KPAtkVsGNuUikA03IzSFW3CZKpikPRWIgdz9N2EMrDl…LweeTGH9U8oxyZtLGKiDDNfyQSqMRgtGxOLOUHA2YPiTpB-0P", b: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY2NDNkZDM5ZDM4ZGI4NW…ury1qIkhIdDJKj4cWi4voZOgBdMJSDqhEOeC5osPZig7G1wsw", c: 1559094120646}
// i: null
// isAnonymous: false
// ja: undefined
// ka: null
// l: "AIzaSyBIS8BFD8aWDObqmVMQC5FmGJePqhAbYZQ"
// m: rc {src: P, a: {…}, b: 3}
// metadata: ul {a: "1559090521974", b: "1559090521974", lastSignInTime: "Wed, 29 May 2019 00:42:01 GMT", creationTime: "Wed, 29 May 2019 00:42:01 GMT"}
// o: "[DEFAULT]"
// phoneNumber: null
// photoURL: null
// providerData: [wl]
// qa: false
// ra: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY2NDNkZDM5ZDM4ZGI4NWU1NjAxN2E2OGE3NWMyZjM4YmUxMGM1MzkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHBhbnRyeS1kMGVkYyIsImF1ZCI6InBwYW50cnktZDBlZGMiLCJhdXRoX3RpbWUiOjE1NTkwOTA1MjIsInVzZXJfaWQiOiJPOEplUHpsVTZPZWt3cXl3T2s5NFZoQjVZZjUzIiwic3ViIjoiTzhKZVB6bFU2T2Vrd3F5d09rOTRWaEI1WWY1MyIsImlhdCI6MTU1OTA5MDUyMiwiZXhwIjoxNTU5MDk0MTIyLCJlbWFpbCI6Inllc0B5ZXMuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInllc0B5ZXMuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.CE-cFf9AxByuo1luRe2dphvBWSqQjzHGKpk1Ha35Ar786nTKy44w_5ojN1vtYxLPoIG2VUNlYq23Kgv0q6qQS9lL64L-T4oxnc0Oqny44D_8MxbtgVDbyP4X91YS29_r6OP9YegirM6CeuFllnbT4_fFSTpMrss8orXnXfFJbNzq9TGBrC9auWLYJHDDGRgDmXGgIk_ThlDhUz_zERZTfZx2l_ozRDR-po9b5Avld6G2NMVv3DPp7QniqN5HqIpr_XH-oeMQq21J0Cxv7ifaxBlgEchSEpZ2KDI4Bury1qIkhIdDJKj4cWi4voZOgBdMJSDqhEOeC5osPZig7G1wsw"
// refreshToken: "AEu4IL2KPAtkVsGNuUikA03IzSFW3CZKpikPRWIgdz9N2EMrDlgl37FrWJCASORf_JLsAjOuJJdk85OqjZyo1ZHK3NBO0TOAemmF6nvKZsD5lTkX1xnbUaUz-zDBj-3h1R5NdhjCcFduZ98PpdUcyhZem6LLweeTGH9U8oxyZtLGKiDDNfyQSqMRgtGxOLOUHA2YPiTpB-0P"
// sa: ƒ (e)
// ta: ƒ (e)
// u: "ppantry-d0edc.firebaseapp.com"
// uid: "O8JePzlU6OekwqywOk94VhB5Yf53"
// _lat: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY2NDNkZDM5ZDM4ZGI4NWU1NjAxN2E2OGE3NWMyZjM4YmUxMGM1MzkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHBhbnRyeS1kMGVkYyIsImF1ZCI6InBwYW50cnktZDBlZGMiLCJhdXRoX3RpbWUiOjE1NTkwOTA1MjIsInVzZXJfaWQiOiJPOEplUHpsVTZPZWt3cXl3T2s5NFZoQjVZZjUzIiwic3ViIjoiTzhKZVB6bFU2T2Vrd3F5d09rOTRWaEI1WWY1MyIsImlhdCI6MTU1OTA5MDUyMiwiZXhwIjoxNTU5MDk0MTIyLCJlbWFpbCI6Inllc0B5ZXMuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInllc0B5ZXMuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.CE-cFf9AxByuo1luRe2dphvBWSqQjzHGKpk1Ha35Ar786nTKy44w_5ojN1vtYxLPoIG2VUNlYq23Kgv0q6qQS9lL64L-T4oxnc0Oqny44D_8MxbtgVDbyP4X91YS29_r6OP9YegirM6CeuFllnbT4_fFSTpMrss8orXnXfFJbNzq9TGBrC9auWLYJHDDGRgDmXGgIk_ThlDhUz_zERZTfZx2l_ozRDR-po9b5Avld6G2NMVv3DPp7QniqN5HqIpr_XH-oeMQq21J0Cxv7ifaxBlgEchSEpZ2KDI4Bury1qIkhIdDJKj4cWi4voZOgBdMJSDqhEOeC5osPZig7G1wsw"
// __proto__: F
// __proto__: Object