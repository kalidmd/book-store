const express = require('express');
const getUser = require('../controllers/users');

const router = express.Router();

router.route('/:id').get(getUser);

module.exports = router