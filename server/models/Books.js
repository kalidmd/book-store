const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please Provide Title']
    },
    description: {
        type: String,
        required: [true, 'Please Provide Description']
    },
    catagory: {
        type: String,
        enum: ['Fiction', 'Romance', 'Mystery', 'Horror'],
        required: [true, 'Please Select Catagory']
    },
    // trending: {
    //     type: 
    // },
    oldPrice : {
        type: Number,
        required: [true, 'Please Provide Old Price'],
    },
    newPrice : {
        type: Number,
        required: [true, 'Please Provide New Price'],
    }

}, {timestamps: true})

module.exports = mongoose.model('books', bookSchema)