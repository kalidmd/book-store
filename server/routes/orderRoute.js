const express = require('express');
const { createAnOrder ,getOrders} = require('../controllers/orderController');

const router = express.Router();

router.route('/').post(createAnOrder).get(getOrders);

module.exports = router;