require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
// define app
const app = express();
//import DB
const connectDB = require('./db/connect')
// import Routes
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
// import middlewares
const errorHandlerMiddleware = require('./middlewares/error-handler');
const authMiddleware = require('./middlewares/authentication');

app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/books',authMiddleware , booksRouter);
// app.use('/api/v1/books', booksRouter);

// middlewares
app.use(errorHandlerMiddleware);


const port = 5000 || process.env.PORT;

app.get('/', (req, res) => {
    res.status(200).send('Home Page')
})

const localURI = process.env.MONGO_URI_LOCAL;
const ProductionURI = process.env.MONGO_URI_PRODUCTION;

const start = async () => {
    try {
        //connectDB
        await connectDB(localURI);
        app.listen(port, 
            () => console.log(`Server is Listening on port ${port}...`)
        )    
    } catch (error) {
        console.log(error);
    }
}

start();