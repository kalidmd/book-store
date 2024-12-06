const { ForbiddenError } = require("../error");

const roleAuthMiddleware = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            throw new ForbiddenError('Access Denied!')
        }
        next();
    }
}

module.exports = roleAuthMiddleware;