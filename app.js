const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend domain if different
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.listen(3001, () => {
    console.log('Server running on port 3000');
});
