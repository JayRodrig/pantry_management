// NPM MODULES
const express = require('express');
const moment = require('moment-timezone');

// LOCAL MODULES
const { upcomingMealsIngList, } = require('../services/shopping_list');
const config = require('../services/twilio/config.js')
const client = require('twilio')(config.acc_sid, config.acc_token);

// DATE RANGE HELPER FUNCTION
const getWeekDateRange = _ => {
    const weekStartTime = moment().day('monday');
    const weekEndTime = moment().day('monday').add(4, 'days');

    const weekStart = moment.tz(weekStartTime, 'America/New_York').format('MMMM DD, YYYY');
    const weekEnd = moment.tz(weekEndTime, 'America/New_York').format('MMMM DD, YYYY');
    return [weekStart, weekEnd];
}

//SEND SMS
const sendSMS = async ( request, response ) => {
    const { user_id, phone_number} = request.params;
    const weekDateRange = getWeekDateRange();
    const ingredientsList = await upcomingMealsIngList(user_id, weekDateRange[0], weekDateRange[1]);

    const values = Object.values(ingredientsList)
    let textMessageBody = 'At least... ';
    values.forEach(e => {
        textMessageBody += `${e.needed_weight} grams of ${e.product_name} is needed. `
    })

    client.messages
        .create({
            body: textMessageBody,
            from: config.acc_number,
            to: phone_number
        })
        .then(message => {
            response.status(200).json({
                message: 'Text Message Has Been Sent',
                status: message.status
            })
        })
        .catch(err => {
            response.status(400).json({
                'msg': `Something went wrong`,
                e: err.toString(),
            });
        });
}


const getSMSRouter = _ => {
    const SMSRouter = express.Router();
    
    SMSRouter.get('/:user_id/:phone_number', sendSMS);
    
    return SMSRouter;
};

module.exports = {
    getSMSRouter,
};