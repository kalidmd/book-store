const express = require('express');
const router = express.Router();

const { register, login, signinWithGoogle } = require('../controllers/authController');


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/google').post(signinWithGoogle);

module.exports = router;

