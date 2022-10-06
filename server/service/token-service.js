const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(userId, refreshToken) {
        const tokeData = await TokenModel.findOne({userId});
        if (tokeData) {
            tokeData.refreshToken = refreshToken;
            return tokeData.save();
        }
        return await tokeData.create({userId, refreshToken});
    }
}

module.exports = new TokenService();