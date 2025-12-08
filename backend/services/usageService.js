'use strict';

const Usage = require('../models/Usage');
const Budget = require('../models/Budget');
const RecurringTransaction = require('../models/RecurringTransactions');
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

async function decrementUsage(userId, metric, period = 'monthly', amount = 1) {
  const periodDate = getPeriodDate(period);
  
  const usage = await Usage.findOneAndUpdate(
    {
      user: userId,
      metric,
      period,
      periodDate,
    },
    {
      $inc: { count: -amount },
    },
    {
      upsert: false,
      new: true,
    }
  );
  
  if (!usage) {
    return 0;
  }
  
  return Math.max(0, usage.count);
}

async function checkUsageLimit(userId, plan, metric, period = 'monthly') {
  let currentUsage;
  
  // Map metric name from usage counter format to plan limits format
  const metricMap = {
    'recurring_transactions': 'recurringTransactions',
    'api_requests': 'apiRequests',
  };
  const planMetric = metricMap[metric] || metric;
  
  // For budgets and recurring_transactions, count actual records to ensure accuracy
  if (metric === 'budgets') {
    currentUsage = await Budget.countDocuments({ user: userId });
  } else if (metric === 'recurring_transactions') {
    currentUsage = await RecurringTransaction.countDocuments({ user: userId });
  } else {
    // For other metrics, use the usage counter
    currentUsage = await getCurrentUsage(userId, metric, period);
  }
  
  const limitCheck = checkLimit(plan, planMetric, currentUsage);
  
  if (!limitCheck.allowed) {
    const metricNames = {
      transactions: 'transactions',
      receipts: 'receipt uploads',
      budgets: 'budgets',
      recurringTransactions: 'recurring transactions',
      exports: 'exports',
      apiRequests: 'API requests',
    };
    
    const metricName = metricNames[planMetric] || metric;
    const friendlyMessage = `You've reached your ${metricName} limit for this month (${limitCheck.limit}). Please upgrade your plan to continue using this feature.`;
    
    throw new UsageLimitExceededError(friendlyMessage, {
      metric,
      limit: limitCheck.limit,
      current: currentUsage,
      remaining: limitCheck.remaining,
    });
  }
  
  return {
    current: currentUsage,
    limit: limitCheck.limit,
    remaining: limitCheck.remaining,
  };
}

async function getUsageSummary(userId, plan) {
  const metrics = [
    { key: 'transactions', planKey: 'transactions' },
    { key: 'receipts', planKey: 'receipts' },
    { key: 'budgets', planKey: 'budgets' },
    { key: 'recurring_transactions', planKey: 'recurringTransactions' },
    { key: 'exports', planKey: 'exports' },
    { key: 'api_requests', planKey: 'apiRequests' },
  ];
  
  const summary = {};
  
  for (const { key, planKey } of metrics) {
    let currentUsage;
    
    // For budgets and recurring_transactions, count actual records to ensure accuracy
    if (key === 'budgets') {
      currentUsage = await Budget.countDocuments({ user: userId });
    } else if (key === 'recurring_transactions') {
      currentUsage = await RecurringTransaction.countDocuments({ user: userId });
    } else {
      // For other metrics, use the usage counter
      currentUsage = await getCurrentUsage(userId, key, 'monthly');
    }
    
    const limitCheck = checkLimit(plan, planKey, currentUsage);
    
    summary[key] = {
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
  decrementUsage,
  checkUsageLimit,
  getUsageSummary,
  getPeriodDate,
};

