const express = require('express');
const getUser = require('../controllers/userController');
const { verifyMailtoken } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authentication');

const router = express.Router();

router.route('/user/:id').get(authMiddleware, getUser);
router.route('/:id/verify/:mailToken').get(verifyMailtoken);

module.exports = router