const express = require('express');
const { createAnOrder ,getOrders} = require('../controllers/order');

const router = express.Router();

router.route('/').post(createAnOrder);
router.route('/').get(getOrders);


module.exports = router;