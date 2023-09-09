const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.error(error)
            res.status(401).json({ msg: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ msg: 'Not authorized, no token' });
    }
}

const developerRoute = (req, res, next) => {
    if (req.user && req.user.role === 'developer') {
        next()
    } else {
        res.status(401).json({ msg: 'Not authorized!' });
    }
}

const adminRoute = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        res.status(401).json({ msg: 'Not authorized!' });
    }
}

module.exports = {
    protect,
    developerRoute,
    adminRoute
}