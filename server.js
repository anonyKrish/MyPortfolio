const express = require('express');
const connectDB = require('./connect');
const cors = require('cors');
const Message = require('./models/Message');
const { connect } = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.post('/api/messages', async (req, res) => {
    try {
       await connectDB();
        const { name, email, message } = req.body;
        const newMessage = new Message({
            name,
            email,
            message
        });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error sending message' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));