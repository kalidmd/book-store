const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide Full Name'],
    },
    email: {
        type: String,
        required: [true, 'Please Provide Email'],
    },
    phone: {
        type: Number,
        required: [true, 'Please Provide Number'],
    },
    location: {
        address: {
            type: String,
            required: [true, 'Please Provide Address']
        },
        city: {
            type: String,
            required: [true, 'Please Provide City'],
        },
        country: {
            type: String,
            required: [true, 'Please Provide Country'],
        },
        state: String,
        zipcode: String,
    
    },
    productIds: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Book',
            required: [true, 'Please Provide Book Id']
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please Provide createdBy']
    }
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);