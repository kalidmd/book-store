const { StatusCodes } = require('http-status-codes');
const Book = require('../models/Books');
const { NotFoundError } = require('../error');

const createBook = async (req, res) => {

    const book = await Book.create(req.body);

    res.status(StatusCodes.OK).json(book);
}

const getBooks = async (req, res) => {
    const book = await Book.find({ }).sort('-updatedAt');

    if(book.length < 1) {
        throw new NotFoundError('Can\'t find book')
    }
    res.status(StatusCodes.OK).json({ book });
}

const getSingleBook = async (req, res) => {
    // console.log(req.params);
    const { id: bookId } = req.params;

    const book = await Book.findOne({ _id: bookId });

    if(!book) {
        throw new NotFoundError(`Can't find book with id ${bookId}`);
    }

    res.status(StatusCodes.OK).json({ count: book.length, book })
}

const updateBook = async (req, res) => {
    const {params: {id: bookId}, user: {userId}} = req;
    const book = await Book.findOneAndUpdate({ _id: bookId, createdBy: userId }, req.body, {new: true, runValidators: true})

    if(!book) {
        throw new NotFoundError(`No Book Found With ID ${bookId}`);
    }

    res.status(StatusCodes.OK).json({ book })
}

const deleteBook = async (req, res) => {
    const {params: {id: bookId}, user: {userId}} = req;
    const book = await Book.findOneAndDelete({ _id: bookId, createdBy: userId });

    if(!book) {
        throw new NotFoundError(`No Book Found With ID ${bookId}`);
    }

    res.status(StatusCodes.OK).json({ book });
}

module.exports = { createBook, getBooks, getSingleBook, updateBook, deleteBook };