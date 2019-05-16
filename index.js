// LOCAL MODULE
const {getApp,} = require('./app');

// EXPRESS APP / SERVER INIT
getApp().listen(11235, _ => {
    console.log('Server listening on port #11235');
});