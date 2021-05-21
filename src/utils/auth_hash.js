const jwt = require('jsonwebtoken');
const jwt_secret = require('../../env/env');

function getTokenPayload(token){
    return jwt.verify(token, jwt_secret)
}

 function getUserIdFromToken(req) {
    if(req){
        const token = req.headers.authorization.replace('Bearer ', '');
        if(!token){
            throw new Error('No token found')
        }
        const {userId} = getTokenPayload(token)
        return userId
    }
    if(authToken){
        const {userId} = getTokenPayload(authToken)
        return userId
    }
    throw new Error('authentication required')
}
module.exports = getUserIdFromToken