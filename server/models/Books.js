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
    category: {
        type: String,
        enum: ['Fiction', 'Romance', 'Mystery', 'Horror', 'Business', 'Adventure', 'Marketing'],
        required: [true, 'Please Select Category']
    },
    trending: {
        type: Boolean,
        required : [true, 'Please Provide Trending Value'] 
    },
    coverImage: {
        type: String,
        required: [true, 'Please Provide Cover Image']
    },
    oldPrice : {
        type: Number,
        required: [true, 'Please Provide Old Price'],
    },
    newPrice : {
        type: Number,
        required: [true, 'Please Provide New Price'],
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        // required: [true, 'Please Provide User']
    }

}, {timestamps: true})

module.exports = mongoose.model('Book', bookSchema)