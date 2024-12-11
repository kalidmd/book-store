const { StatusCodes } = require('http-status-codes');
const cloudinary = require('../utils/cloudinary');
const Book = require('../models/bookModel');

const { NotFoundError } = require('../error');

const createBook = async (req, res) => {
    const { coverImage } = req.body;
    
    const result = await cloudinary.uploader.upload(coverImage, {
        folder: 'books'
    })

    const book = await Book.create({ 
        ...req.body, 
        coverImage: {
            public_id: result.public_id,
            url: result.url
    } });
    
    res.status(StatusCodes.CREATED).json({ book });

}

const getBooks = async (req, res) => {
    const search = req.query.search || '';

    const book = await Book.find({ 
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { author: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } }
        ]
    }).sort('-updatedAt');

    if(book.length === 0) {
        throw new NotFoundError('No Book Found!')
    }

    res.status(StatusCodes.OK).json({ count: book.length, book });
}

const getSingleBook = async (req, res) => {
    const { id: bookId } = req.params;

    const book = await Book.findOne({ _id: bookId });

    if(!book) {
        throw new NotFoundError(`Can't find book with id ${bookId}`);
    }

    res.status(StatusCodes.OK).json({ count: book.length, book })
}

const updateBook = async (req, res) => {
    const { id: bookId } = req.params;
    const { coverImage } = req.body;

    const result = await cloudinary.uploader.upload(coverImage, {
        folder: 'books'
    })

    const book = await Book.findOneAndUpdate({ _id: bookId }, {...req.body, coverImage: {
        public_id: result.public_id,
        url: result.url
    }}, {new: true, runValidators: true})

    // const book = await Book.findOneAndUpdate({ _id: bookId }, 
    //     {
    //         ...req.body, 
    //         coverImage: {
    //             public_id: result.public_id,
    //             url: result.url
    //         }
    //     }, 
    //     {new: true, runValidators: true})

    if(!book) {
        throw new NotFoundError(`No Book Found With ID ${bookId}`);
    }

    res.status(StatusCodes.OK).json({ book })
}

const deleteBook = async (req, res) => {
    const {params: {id: bookId}} = req;
    const book = await Book.findOneAndDelete({ _id: bookId });

    if(!book) {
        throw new NotFoundError(`No Book Found With ID ${bookId}`);
    }

    res.status(StatusCodes.OK).json({ book });
}

module.exports = { createBook, getBooks, getSingleBook, updateBook, deleteBook };