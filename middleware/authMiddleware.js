// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = await User.findById(decoded.userId);
        if (!req.user) {
            return res.status(401).send('Invalid token.');
        }
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = authMiddleware;
