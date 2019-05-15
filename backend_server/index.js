const {getApp,} = require('./app');

getApp().listen(11235, () => {
    console.log('Server listening on port #11235');
});