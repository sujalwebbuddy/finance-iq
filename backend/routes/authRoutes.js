'use strict';

const express = require('express');
const router = express.Router();
const { 
  signup, 
  login, 
  getMe, 
  completeSetup,
  googleAuth,
  googleCallback,
  googleSuccess,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegistration } = require('../middleware/validationMiddleware');

router.post('/signup', validateRegistration, signup);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/setup', protect, completeSetup);

// Google OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback, googleSuccess);

module.exports = router;