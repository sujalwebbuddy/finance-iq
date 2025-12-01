'use strict';

class SubscriptionError extends Error {
  constructor(message, context = {}) {
    super(message);
    this.name = 'SubscriptionError';
    this.statusCode = context.statusCode || 400;
    this.code = context.code || 'SUBSCRIPTION_ERROR';
    this.context = context;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SubscriptionError);
    }
  }
}

class UsageLimitExceededError extends SubscriptionError {
  constructor(message, context = {}) {
    super(message, {
      ...context,
      statusCode: 403,
      code: 'USAGE_LIMIT_EXCEEDED',
    });
    this.name = 'UsageLimitExceededError';
  }
}

class FeatureNotAvailableError extends SubscriptionError {
  constructor(message, context = {}) {
    super(message, {
      ...context,
      statusCode: 403,
      code: 'FEATURE_NOT_AVAILABLE',
    });
    this.name = 'FeatureNotAvailableError';
  }
}

module.exports = {
  SubscriptionError,
  UsageLimitExceededError,
  FeatureNotAvailableError,
};

