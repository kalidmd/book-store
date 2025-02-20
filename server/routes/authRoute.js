const express = require('express');
const router = express.Router();

const { register, login, signinWithGoogle, forgotPassword } = require('../controllers/authController');


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/google').post(signinWithGoogle);
router.route('/forgot-password').post(forgotPassword);

module.exports = router;

