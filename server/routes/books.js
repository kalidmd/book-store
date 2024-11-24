const express = require('express')
const router = express.Router();

const { 
    createBook, 
    getBooks, 
    getSingleBook, 
    updateBook, 
    deleteBook 
} = require('../controllers/books');

router.route('/').post(createBook).get(getBooks);
router.route('/:id').get(getSingleBook).put(updateBook).delete(deleteBook);

module.exports = router;

