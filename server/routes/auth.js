const express = require('express');
const router = express.Router();

const { register, login, dashboard } = require('../controllers/auth');
const authMiddleware = require('../middlewares/authentication');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/dashboard').get(authMiddleware,dashboard);

module.exports = router;

