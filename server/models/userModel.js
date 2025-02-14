const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Provide username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please Provide Email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please Provide Password']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
        required: true
    }

}, {timestamps: true})

// hash user password
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

// creating jwt token instance
userSchema.methods.createJWT = function () {
    const payload = {
        userId: this._id,
        username: this.username,
        email: this.email,
        role: this.role
    }
    return jwt.sign(payload, process.env.JWT_SECRECT, { expiresIn: process.env.JWT_lIFETIME });
}


module.exports = mongoose.model('User', userSchema);