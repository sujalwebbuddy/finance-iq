'use strict';

const subscriptionService = require('../services/subscriptionService');
const usageService = require('../services/usageService');
const { UsageLimitExceededError } = require('../services/errors/SubscriptionError');

function createUsageLimitMiddleware(metric, period = 'monthly') {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      const plan = await subscriptionService.getUserPlan(userId);
      
      await usageService.checkUsageLimit(userId, plan, metric, period);
      
      next();
    } catch (error) {
      if (error instanceof UsageLimitExceededError) {
        return res.status(error.statusCode).json({
          message: error.message,
          code: error.code,
          context: error.context,
        });
      }
      
      return res.status(500).json({
        message: 'Error checking usage limit',
        error: error.message,
      });
    }
  };
}

async function checkUsageLimitAfterOperation(req, res, next) {
  try {
    const userId = req.user.id;
    const plan = await subscriptionService.getUserPlan(userId);
    
    const metric = req.usageMetric;
    const period = req.usagePeriod || 'monthly';
    
    if (metric) {
      await usageService.checkUsageLimit(userId, plan, metric, period);
    }
    
    next();
  } catch (error) {
    if (error instanceof UsageLimitExceededError) {
      return res.status(error.statusCode).json({
        message: error.message,
        code: error.code,
        context: error.context,
      });
    }
    
    return res.status(500).json({
      message: 'Error checking usage limit',
      error: error.message,
    });
  }
}

module.exports = {
  createUsageLimitMiddleware,
  checkUsageLimitAfterOperation,
};

