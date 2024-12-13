const { StatusCodes } = require('http-status-codes');

const Book = require('../models/bookModel');
const Order = require('../models/orderModel');

const Dashboard = async (req, res) => {
    res.status(StatusCodes.OK).json('Dashboard');
}

module.exports = Dashboard;