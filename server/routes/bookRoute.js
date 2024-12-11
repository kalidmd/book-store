const express = require('express')
const router = express.Router();
// const { StatusCodes } = require('http-status-codes');
// const multer = require('multer');

const { 
    createBook, 
    getBooks, 
    getSingleBook, 
    updateBook, 
    deleteBook 
} = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authentication');
const roleAuthMiddleware = require('../middlewares/role-based-authentication-middleware');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../client/public/images');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     },
// });

// const upload = multer({ storage: storage });

router.route('/').post(authMiddleware, roleAuthMiddleware('admin'), createBook).get(getBooks);
router.route('/:id').get(getSingleBook).put(authMiddleware, roleAuthMiddleware('admin'), updateBook).delete(authMiddleware, roleAuthMiddleware('admin'), deleteBook);

module.exports = router;

