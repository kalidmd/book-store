const { StatusCodes } = require('http-status-codes');

const Book = require('../models/bookModel');
const Order = require('../models/orderModel');
const { NotFoundError } = require('../error');

const Dashboard = async (req, res) => {
    // Dashboard Stats
        // Total Number of Orders
        const totalOrders = await Order.countDocuments();

        // Total Sales - Sum of All Total Price from Orders.
        const totalSalesCount = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" },
                }
            }
        ]);

        // To Get only the Number of Total Sales Count
        const totalSales = totalSalesCount.length > 0 ? totalSalesCount[0]?.totalSales : 0;

        // Trending Books Stat
        const trendingBooksCount = await Book.aggregate([
            { $match: { trending: true } },  // Match only trending Books
            { $count: "trendingBooksCount" }  // Return the count of trending books
        ]);

        // To Get only the Number of Trending Book Count
        const trendingBooks = trendingBooksCount.length > 0 ? trendingBooksCount[0].trendingBooksCount : 0;

        // Total Number of Books
        const totalBooks = await Book.countDocuments();

        // Monthly Sales (sum of total sales for each month)
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // grouping by year and month
                    totalSales: { $sum: "$totalPrice" }, // sum of total price for each month
                    totalOrders: { $sum: 1 }  // Count total orders for each month
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Result Summary
        res.status(StatusCodes.OK).json({ 
            totalOrders, 
            totalSales,
            trendingBooks,
            totalBooks,
            monthlySales
        });
}

module.exports = Dashboard;