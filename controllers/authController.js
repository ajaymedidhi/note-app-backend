const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    
    try {
        await user.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(500).send(err.message); // Handle errors appropriately
    }
};

// authController.js
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).send('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.json({ token }); // Send the token in the response body
};

