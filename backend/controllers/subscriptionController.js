'use strict';

const subscriptionService = require('../services/subscriptionService');
const usageService = require('../services/usageService');
const { getPlanLimits } = require('../config/planLimits');

async function getCurrentSubscription(req, res) {
  try {
    const userId = req.user.id;
    const subscription = await subscriptionService.getUserSubscription(userId);
    const usageSummary = await usageService.getUsageSummary(userId, subscription.plan);
    const planLimits = getPlanLimits(subscription.plan);
    
    res.json({
      subscription: {
        plan: subscription.plan,
        status: subscription.status,
        currentPeriodStart: subscription.currentPeriodStart,
        currentPeriodEnd: subscription.currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      },
      usage: usageSummary,
      limits: planLimits,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      message: error.message || 'Error fetching subscription',
      error: error.message,
    });
  }
}

async function getUsageSummary(req, res) {
  try {
    const userId = req.user.id;
    const plan = await subscriptionService.getUserPlan(userId);
    const usageSummary = await usageService.getUsageSummary(userId, plan);
    
    res.json(usageSummary);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      message: error.message || 'Error fetching usage summary',
      error: error.message,
    });
  }
}

async function cancelSubscription(req, res) {
  try {
    const userId = req.user.id;
    const { cancelAtPeriodEnd } = req.body;
    
    const subscription = await subscriptionService.cancelSubscription(
      userId,
      cancelAtPeriodEnd !== false
    );
    
    res.json({
      message: cancelAtPeriodEnd !== false
        ? 'Subscription will be cancelled at the end of the billing period'
        : 'Subscription cancelled immediately',
      subscription: {
        plan: subscription.plan,
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      },
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      message: error.message || 'Error cancelling subscription',
      error: error.message,
    });
  }
}

async function reactivateSubscription(req, res) {
  try {
    const userId = req.user.id;
    const subscription = await subscriptionService.reactivateSubscription(userId);
    
    res.json({
      message: 'Subscription reactivated successfully',
      subscription: {
        plan: subscription.plan,
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      },
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      message: error.message || 'Error reactivating subscription',
      error: error.message,
    });
  }
}

module.exports = {
  getCurrentSubscription,
  getUsageSummary,
  cancelSubscription,
  reactivateSubscription,
};

