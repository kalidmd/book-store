const express = require('express');
const getUser = require('../controllers/userController');
const { adminLogin } = require('../controllers/authController');
const roleAuthMiddleware = require('../middlewares/role-based-authentication-middleware')
const router = express.Router();

router.route('/user/:id').get(getUser);

module.exports = router