// LOCAL MODULES
const {getFirebaseApp,} = require('./firebase');

const authMiddleware = (request, response, next) => {
    const {token,} = request.headers;
    
    getFirebaseApp().auth().verifyIdToken(token)
        .then(decodedToken => {
            const uid = decodedToken.uid;
            next();
        })
        .catch(e => {
            response.json({
                'msg': `Auth failed, token is not valid`,
                e: e.toString(),
            });
        });
};

module.exports = {
    authMiddleware,
};