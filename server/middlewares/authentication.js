const { UnauthorizedError } = require('../error');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next ) => {
    // check header
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthorizedError('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRECT);
        // attach the user with protected routes
        req.user = {
            userId: payload.userId,
            name: payload.name
        }
        next()
    } catch (error) {
        throw new UnauthorizedError('Unauthorized');
    }
}

module.exports = authMiddleware