const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dto/user-dto');

class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({email});
        if (candidate) {
            throw new Error("The user already exists!");
        }
        const hasPassword = await bcrypt.hash(password, 4);
        const activationLink = uuid.v4();
        const user = await User.create({email, password: hasPassword, activationLink});
        await mailService.sendActivationMail(email, activationLink);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }


    async login(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async activate(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async users(req, res, next) {
        try {
            res.json("fdslkfjaslkdfj");
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new UserService();