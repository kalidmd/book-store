const { StatusCodes } = require('http-status-codes');
const Order = require('../models/Order');
const { NotFoundError } = require('../error');

const createAnOrder = async (req, res) => {
    const { userId } = req.user;

    const order = await Order.create({ ...req.body, createdBy: userId });
    // const savedOrder = await order.save();

    res.status(StatusCodes.CREATED).json( { order } );
}

const getOrders = async (req, res) => {
    const { userId } = req.user;

    const order = await Order.find({ createdBy: userId }).sort('-updatedAt');
    if (order.length < 1) {
        throw new NotFoundError('Cant find Orders');
    }

    res.status(StatusCodes.OK).json({count: order.length,  order })
}

module.exports = { createAnOrder, getOrders };