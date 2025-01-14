const express = require('express')
const router = express.Router();
// const { StatusCodes } = require('http-status-codes');
// const multer = require('multer');

const { 
    createBook, 
    getBooks, 
    getSingleBook, 
    updateBook, 
    deleteBook,
    addToFavorite,
    getFavoriteBooks
} = require('../controllers/bookController');

const authMiddleware = require('../middlewares/authentication');
const roleAuthMiddleware = require('../middlewares/role-based-authentication-middleware');

router.route('/').post(authMiddleware, roleAuthMiddleware('admin'), createBook).get(getBooks);
router.route('/favorite').put(authMiddleware, addToFavorite).get(authMiddleware, getFavoriteBooks);
router.route('/:id').get(getSingleBook).put(authMiddleware, roleAuthMiddleware('admin'), updateBook).delete(authMiddleware, roleAuthMiddleware('admin'), deleteBook);

module.exports = router;

