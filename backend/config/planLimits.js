'use strict';

const PLAN_LIMITS = {
  free: {
    transactions: 50,
    receipts: 0,
    budgets: 3,
    recurringTransactions: 2,
    exports: 0,
    apiRequests: 100,
    features: {
      receiptOcr: false,
      advancedAnalytics: false,
      apiAccess: false,
      prioritySupport: false,
    },
  },
  basic: {
    transactions: 500,
    receipts: 10,
    budgets: 10,
    recurringTransactions: 10,
    exports: 5,
    apiRequests: 1000,
    features: {
      receiptOcr: true,
      advancedAnalytics: false,
      apiAccess: false,
      prioritySupport: false,
    },
  },
  pro: {
    transactions: -1,
    receipts: -1,
    budgets: -1,
    recurringTransactions: -1,
    exports: -1,
    apiRequests: 10000,
    features: {
      receiptOcr: true,
      advancedAnalytics: true,
      apiAccess: true,
      prioritySupport: true,
    },
  },
  enterprise: {
    transactions: -1,
    receipts: -1,
    budgets: -1,
    recurringTransactions: -1,
    exports: -1,
    apiRequests: -1,
    features: {
      receiptOcr: true,
      advancedAnalytics: true,
      apiAccess: true,
      prioritySupport: true,
      sso: true,
      whiteLabel: true,
    },
  },
};

function getPlanLimits(plan) {
  return PLAN_LIMITS[plan] || PLAN_LIMITS.free;
}

function hasFeatureAccess(plan, feature) {
  const limits = getPlanLimits(plan);
  return limits.features[feature] === true;
}

function checkLimit(plan, metric, currentUsage) {
  const limits = getPlanLimits(plan);
  const limit = limits[metric];
  
  if (limit === -1) {
    return { allowed: true, remaining: -1 };
  }
  
  const remaining = Math.max(0, limit - currentUsage);
  return {
    allowed: currentUsage < limit,
    remaining,
    limit,
  };
}

module.exports = {
  PLAN_LIMITS,
  getPlanLimits,
  hasFeatureAccess,
  checkLimit,
};

