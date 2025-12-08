'use strict';

const subscriptionService = require('../services/subscriptionService');
const { FeatureNotAvailableError } = require('../services/errors/SubscriptionError');

function createFeatureAccessMiddleware(feature) {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      await subscriptionService.requireFeatureAccess(userId, feature);
      next();
    } catch (error) {
      if (error instanceof FeatureNotAvailableError || error.name === 'SubscriptionError') {
        return res.status(error.statusCode || 403).json({
          message: error.message,
          code: error.code || 'FEATURE_NOT_AVAILABLE',
          context: error.context,
        });
      }
      
      return res.status(500).json({
        message: 'Something went wrong while checking your plan access. Please try again later.',
        error: error.message,
      });
    }
  };
}

module.exports = {
  createFeatureAccessMiddleware,
};

