require('dotenv').config();
require('express-async-errors');
const express = require('express');
//import DB
const connectDB = require('./db/connect')

const app = express();

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