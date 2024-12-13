const express = require('express');
const router = express.Router();

const Dashboard = require('../controllers/dashboardController');

router.route('/').get(Dashboard);

module.exports = router;
