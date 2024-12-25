require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
    // Main App Defenition
const app = express();
    // Import DB
const connectDB = require('./db/connect')
    // Import Routes
const authRouter = require('./routes/authRoute');
const booksRouter = require('./routes/bookRoute');
const usersRouter = require('./routes/userRoute');
const orderRouter = require('./routes/orderRoute');
const dashboardRouter = require('./routes/dashboardRoute');
    // Import Middlewares
const errorHandlerMiddleware = require('./middlewares/error-handler');
const authMiddleware = require('./middlewares/authentication');
const roleAuthMiddleware = require('./middlewares/role-based-authentication-middleware');

// app.use(cors({
//     origin: ['http://localhost:3000'],
//     credentials: true
// }));

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

    // Routes Usage
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', booksRouter);
app.use('/api/v1/users', authMiddleware, usersRouter);
app.use('/api/v1/orders', authMiddleware, orderRouter);
app.use('/api/v1/admin/dashboard', authMiddleware, roleAuthMiddleware('admin'), dashboardRouter);

    // Middlewares Usage
app.use(errorHandlerMiddleware);

    // Port Var Defenition
const port = 5000 || process.env.PORT;

app.get('/', (req, res) => {
    res.status(200).send('Online Book Store API')
})

    // DB Connection Strings
const localURI = process.env.MONGO_URI_LOCAL;
const productionURI = process.env.MONGO_URI_PRODUCTION;

    // Starter Func()
const start = async () => {
    try {
        // Connect to DB
        await connectDB(productionURI);
        app.listen(port, 
            () => console.log(`Server is Listening on port ${port}...`)
        )    
    } catch (error) {
        console.log(error);
    }
}

start();