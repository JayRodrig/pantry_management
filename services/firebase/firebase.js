var admin = require("firebase-admin");

var serviceAccount = require("./pantry-managementbe_key");

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