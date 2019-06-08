// NPM MODULES
const express = require('express');

// LOCAL MODULES
const { upcomingMealsIngList, } = require('../services/shopping_list');
// const config = require('../services/twilio/config.js')
const client = require('twilio')(process.env.TW_SID, process.env.TW_TOKEN);

//SEND SMS
const sendSMS = async ( request, response ) => {
    const { user_id, phone_number} = request.params;
    const ingredientsList = await upcomingMealsIngList(user_id);

    const values = Object.values(ingredientsList)
    let textMessageBody = 'At least... ';
    values.forEach(e => {
        textMessageBody += `At least ${e.needed_weight} grams of ${e.product_name} is needed. `
    })

    client.messages
        .create({
            body: textMessageBody,
            from: process.env.TW_NUMBER,
            to: phone_number
        })
        .then(message => {
            console.log(message)
            response.json({
                message: 'Text Message Has Been Sent',
                status: message.status
            })
        })
        .catch(err => {
            console.log(err.toString())
        })
}


const sendSMSRouter = _ => {
    const sendSMSRouter = express.Router();

    sendSMSRouter.get('/:user_id/:phone_number', sendSMS);
    
    return sendSMSRouter;
};

module.exports = {
    sendSMSRouter,
};