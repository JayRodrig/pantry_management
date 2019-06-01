var admin = require("firebase-admin");

var serviceAccount = require("./ppantry-d0edc-firebase-adminsdk-t7s8x-4d16b9136f.json");

const getFirebaseApp = (_ => {
    firebase = null;
    return _ => {
        if (!firebase) {
            firebase = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://ppantry-d0edc.firebaseio.com",
            });
        };
        return firebase;
    };
})();

module.exports = {
    getFirebaseApp,
};