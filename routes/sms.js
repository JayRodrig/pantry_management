// NPM MODULES
const express = require('express');
const moment = require('moment-timezone');

// LOCAL MODULES
const { upcomingMealsIngList, } = require('../services/shopping_list');
const config = require('../services/twilio/config.js')
const client = require('twilio')(config.acc_sid, config.acc_token);

// DATE RANGE HELPER FUNCTION
getWeekDateRange = _ => {
    const date = new Date();
    const day = date.getDay();
    let daysToAdd = 0;
    let daysToEnd = 4;
    if (day === 0) {
        daysToAdd = 1;
        daysToEnd = 5;
    }
    if (day === 2) {
        daysToAdd = 6;
        daysToEnd = 10;
    }
    if (day === 3) {
        daysToAdd = 5;
        daysToEnd = 9;
    }
    if (day === 4) {
        daysToAdd = 4;
        daysToEnd = 8;
    }
    if (day === 5) {
        daysToAdd = 3;
        daysToEnd = 7;
    }
    if (day === 6) {
        daysToAdd = 2;
        daysToEnd = 6;
    }
    const weekStartTime = moment.tz(date,'America/New_York').add(daysToAdd, 'days').format('MMMM DD, YYYY');
    const weekEndTime = moment.tz(date,'America/New_York').add(daysToEnd, 'days').format('MMMM DD, YYYY');
    return [weekStartTime, weekEndTime];
};

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