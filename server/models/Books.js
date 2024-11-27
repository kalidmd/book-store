const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please Provide Title'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Please Provide Description'],
        unique: true,
    },
    category: {
        type: String,
        enum: ['fiction', 'non-fictional','romance', 'fantasy', 'horror', 'business', 'adventure'],
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
    author: {
        type: String,
        required: [true, 'Please Provide Author']
    },
    published: {
        type: String,
        required: [true, 'Please Provide Published']
    },
    oldPrice : {
        type: Number,
        required: [true, 'Please Provide Old Price'],
    },
    newPrice : {
        type: Number,
        required: [true, 'Please Provide New Price'],
    },
    quantity : {
        type: Number,
        required: [true, 'Please Provide Quantity'],
        default: 1
    }
    // createdBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User',
    //     required: [true, 'Please Provide User']
    // }

}, {timestamps: true})

module.exports = mongoose.model('Book', bookSchema)