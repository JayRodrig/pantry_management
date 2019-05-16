// LOCAL MODULE
const {getApp,} = require('./app');

// EXPRESS APP / SERVER INIT
getApp().listen(process.env.PORT || 11235, _ => {
    console.log('Server listening on port #11235');
});