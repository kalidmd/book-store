const mongoose = require('mongoose');

const mailTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User'
    },
    mailToken: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 1800 // 30 Minutes
    }
})

module.exports = mongoose.model('Mailtoken', mailTokenSchema);