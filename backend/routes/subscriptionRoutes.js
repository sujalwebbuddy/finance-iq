'use strict';

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const subscriptionController = require('../controllers/subscriptionController');

router.get('/current', protect, subscriptionController.getCurrentSubscription);
router.get('/usage', protect, subscriptionController.getUsageSummary);
router.post('/cancel', protect, subscriptionController.cancelSubscription);
router.post('/reactivate', protect, subscriptionController.reactivateSubscription);

module.exports = router;

