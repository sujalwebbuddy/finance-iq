'use strict';

const Usage = require('../models/Usage');
const { UsageLimitExceededError } = require('./errors/SubscriptionError');
const { checkLimit } = require('../config/planLimits');

function getPeriodDate(period) {
  const now = new Date();
  if (period === 'daily') {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

async function getCurrentUsage(userId, metric, period = 'monthly') {
  const periodDate = getPeriodDate(period);
  
  const usage = await Usage.findOne({
    user: userId,
    metric,
    period,
    periodDate,
  });
  
  return usage ? usage.count : 0;
}

async function incrementUsage(userId, metric, period = 'monthly', amount = 1) {
  const periodDate = getPeriodDate(period);
  
  const usage = await Usage.findOneAndUpdate(
    {
      user: userId,
      metric,
      period,
      periodDate,
    },
    {
      $inc: { count: amount },
    },
    {
      upsert: true,
      new: true,
    }
  );
  
  return usage.count;
}

async function checkUsageLimit(userId, plan, metric, period = 'monthly') {
  const currentUsage = await getCurrentUsage(userId, metric, period);
  const limitCheck = checkLimit(plan, metric, currentUsage);
  
  if (!limitCheck.allowed) {
    throw new UsageLimitExceededError(
      `Usage limit exceeded for ${metric}. Limit: ${limitCheck.limit}, Current: ${currentUsage}`,
      {
        metric,
        limit: limitCheck.limit,
        current: currentUsage,
        remaining: limitCheck.remaining,
      }
    );
  }
  
  return {
    current: currentUsage,
    limit: limitCheck.limit,
    remaining: limitCheck.remaining,
  };
}

async function getUsageSummary(userId, plan) {
  const metrics = [
    'transactions',
    'receipts',
    'budgets',
    'recurring_transactions',
    'exports',
    'api_requests',
  ];
  
  const summary = {};
  
  for (const metric of metrics) {
    const currentUsage = await getCurrentUsage(userId, metric, 'monthly');
    const limitCheck = checkLimit(plan, metric, currentUsage);
    
    summary[metric] = {
      current: currentUsage,
      limit: limitCheck.limit,
      remaining: limitCheck.remaining,
      allowed: limitCheck.allowed,
    };
  }
  
  return summary;
}

module.exports = {
  getCurrentUsage,
  incrementUsage,
  checkUsageLimit,
  getUsageSummary,
  getPeriodDate,
};

