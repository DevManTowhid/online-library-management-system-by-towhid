// backend/routes/authRoutes.js
const express = require('express');
const { loginUser } = require('../controllers/authController');
const router = express.Router();

// Public route: handles user login
router.post('/login', loginUser);

// You would add /register and /logout here as well

module.exports = router;