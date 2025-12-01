'use strict';

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const stripeController = require('../controllers/stripeController');

router.post('/create-checkout-session', protect, stripeController.createCheckoutSession);

// Note: Webhook route is registered in server.js before express.json()

module.exports = router;

