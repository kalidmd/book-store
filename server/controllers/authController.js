const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel');
const { BadRequestError, UnauthorizedError } = require('../error');

const register = async (req, res) => {
    const user = await User.create({...req.body});
    const token = user.createJWT();

    res.status(StatusCodes.OK).json({ user, token })
    // res.send('register user');
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email) {
        throw new BadRequestError('Please Provide Email!');
    }
    if(!password) {
        throw new BadRequestError('Please Provide Password');
    }

    const user = await User.findOne({ email: email });
    // console.log(user.role);

    if(!user) {
        throw new UnauthorizedError('Invalid Credentials');
    }
    
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) {
        throw new UnauthorizedError('Invalid Credentials');
    }

    const token = await user.createJWT();

    return res.status(StatusCodes.OK).json({ user, token })
}


module.exports = { register, login };