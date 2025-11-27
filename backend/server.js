// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load .env file

// Import Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const catalogRoutes = require('./routes/catalogRoutes'); 

// --- EXPRESS SETUP ---
const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware
app.use(cors({ origin: FRONTEND_URL })); // Only allow your frontend to connect
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- API ROUTES ---

// Health check route
app.get('/', (req, res) => {
    res.status(200).json({ status: 'OLMS Backend API is Running', environment: process.env.NODE_ENV || 'development' });
});

// Primary Routes
app.use('/auth', authRoutes); // Handles /auth/login, etc.
app.use('/admin', adminRoutes); // Handles protected admin routes (requires authMiddleware)
app.use('/catalog', catalogRoutes); // Handles /catalog/books, etc.

// --- SERVER START ---
app.listen(PORT, () => {
    console.log(`\nServer is running on http://localhost:${PORT}`);
    console.log(`Accepting requests from: ${FRONTEND_URL}`);
});