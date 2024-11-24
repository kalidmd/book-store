const Book = require('../models/Books');

const createBook = async (req, res) => {
    const book = await Book.create(req.body);

    res.status(200).json({ count: book.length, book });
}

const getBooks = async (req, res) => {
    res.status(200).send('get books');
}

const getSingleBook = async (req, res) => {
    res.status(200).send('get a single book')
}

const updateBook = async (req, res) => {
    res.status(200).send('update book');
}

const deleteBook = async (req, res) => {
    res.status(200).send('delete book');
}

module.exports = { createBook, getBooks, getSingleBook, updateBook, deleteBook };