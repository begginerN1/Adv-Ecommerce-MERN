const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const errorHandler = require('../middleware/errorMiddleware');
const User = require('../models/UserModel');

const verifyUser = asyncHandler(async(req, res, next) => {
    
    const token = req.cookies.access_token
    if (!token) {
        return next(errorHandler(401,"Unauthorized!"))
    }

    jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden!'));
        
        const userdata = await User.findById(user.id).select("-password -email -photo -phone -address");
        if (!userdata) {
            next(errorHandler(404, "user not found"))
        }

        req.user = userdata;        
        next();
    })
})

// admin only

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next()
    } else {
        return next(errorHandler(401,` ${req.user.name} - Unauthorized! contact your admin`))
    }
}

module.exports = {verifyUser, adminOnly};