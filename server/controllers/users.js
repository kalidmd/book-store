const { StatusCodes } = require('http-status-codes');
const User = require('../models/Users');
const { NotFoundError } = require('../error');

const getUser = async (req, res) => {
    const { userId } = req.user;
    const user = await User.findOne({ _id: userId }).select('-password')
    // const token = user.createJWT();

    if(!user) {
        throw new NotFoundError(`can't find user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ user });
}

module.exports = getUser;