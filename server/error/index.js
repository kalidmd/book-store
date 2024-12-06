const CustomAPIError = require('./custom-api-error');
const BadRequestError = require('./bad-request-error');
const NotFoundError = require('./not-found-error');
const UnauthorizedError = require('./unauthorized-error');
const ForbiddenError = require('./forbidden-error');

module.exports = {
    CustomAPIError,
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError
}