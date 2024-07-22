const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const cors = require('cors');
const cron = require('node-cron'); // Add this line
const Note = require('./models/note'); // Add this line
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'https://669df3ef017118486cb7ccb2--bright-eclair-200148.netlify.app', // Replace with your frontend domain if different
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

// Schedule cron job to delete notes older than 30 days
cron.schedule('0 0 * * *', async () => { // Runs every day at midnight
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    try {
        await Note.deleteMany({ deletedAt: { $lte: thirtyDaysAgo } });
        console.log('Deleted notes older than 30 days');
    } catch (err) {
        console.error('Error deleting old notes:', err);
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001'); // Corrected port number to 3001
});
