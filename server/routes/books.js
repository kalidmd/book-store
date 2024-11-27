const express = require('express')
const router = express.Router();

const { 
    createBook, 
    getBooks, 
    getSingleBook, 
    updateBook, 
    deleteBook 
} = require('../controllers/books');
const authMiddleware = require('../middlewares/authentication');

router.route('/').post(createBook).get(getBooks);
router.route('/:id').get(getSingleBook).put(authMiddleware, updateBook).delete(authMiddleware, deleteBook);

module.exports = router;

