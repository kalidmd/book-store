const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    //   Custom Error
    // ***************
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something Went Wrong Please Try Again Later.'
    }

    //   Validation Error
    // *******************
    if(err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(', ')
        customError.statusCode = 400
    }

    //   Duplication Error (value already in use)
    // ********************************************
    if(err.code && err.code === 11000) {
        customError.msg = `${Object.keys(err.keyValue)} already in use, Please Choose Another ${Object.keys(err.keyValue)}`
        customError.statusCode = 400
    }

    //   Cast Error
    //  ************
    if (err.name === 'CastError') {
        customError.msg = `No Item Found With ID ${err.value}`
        customError.statusCode = 404
    }

    return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware;