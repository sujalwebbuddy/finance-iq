'use strict';

const Subscription = require('../models/Subscription');
const { SubscriptionError } = require('./errors/SubscriptionError');
const { hasFeatureAccess } = require('../config/planLimits');

async function getOrCreateSubscription(userId) {
  let subscription = await Subscription.findOne({ user: userId });
  
  if (!subscription) {
    subscription = new Subscription({
      user: userId,
      plan: 'free',
      status: 'active',
    });
    await subscription.save();
  }
  
  return subscription;
}

async function getUserSubscription(userId) {
  const subscription = await getOrCreateSubscription(userId);
  return subscription;
}

async function getUserPlan(userId) {
  const subscription = await getOrCreateSubscription(userId);
  return subscription.plan;
}

async function updateSubscription(userId, updateData) {
  const subscription = await getOrCreateSubscription(userId);
  
  Object.keys(updateData).forEach((key) => {
    if (updateData[key] !== undefined) {
      subscription[key] = updateData[key];
    }
  });
  
  await subscription.save();
  return subscription;
}

async function checkFeatureAccess(userId, feature) {
  const plan = await getUserPlan(userId);
  return hasFeatureAccess(plan, feature);
}

async function requireFeatureAccess(userId, feature) {
  const hasAccess = await checkFeatureAccess(userId, feature);
  
  if (!hasAccess) {
    const plan = await getUserPlan(userId);
    throw new SubscriptionError(
      `Feature '${feature}' is not available on your current plan (${plan})`,
      {
        code: 'FEATURE_NOT_AVAILABLE',
        statusCode: 403,
        feature,
        plan,
      }
    );
  }
  
  return true;
}

async function updateSubscriptionFromStripe(userId, stripeData) {
  const updateData = {
    stripeCustomerId: stripeData.customerId,
    stripeSubscriptionId: stripeData.subscriptionId,
    status: mapStripeStatusToSubscriptionStatus(stripeData.status),
  };
  
  if (stripeData.currentPeriodStart) {
    updateData.currentPeriodStart = new Date(stripeData.currentPeriodStart * 1000);
  }
  
  if (stripeData.currentPeriodEnd) {
    updateData.currentPeriodEnd = new Date(stripeData.currentPeriodEnd * 1000);
  }
  
  if (stripeData.cancelAtPeriodEnd !== undefined) {
    updateData.cancelAtPeriodEnd = stripeData.cancelAtPeriodEnd;
  }
  
  return await updateSubscription(userId, updateData);
}

function mapStripeStatusToSubscriptionStatus(stripeStatus) {
  const statusMap = {
    active: 'active',
    trialing: 'trialing',
    past_due: 'past_due',
    canceled: 'cancelled',
    unpaid: 'past_due',
  };
  
  return statusMap[stripeStatus] || 'active';
}

async function cancelSubscription(userId, cancelAtPeriodEnd = true) {
  const subscription = await getOrCreateSubscription(userId);
  
  if (subscription.status === 'cancelled') {
    throw new SubscriptionError('Subscription is already cancelled', {
      statusCode: 400,
    });
  }
  
  subscription.cancelAtPeriodEnd = cancelAtPeriodEnd;
  
  if (!cancelAtPeriodEnd) {
    subscription.status = 'cancelled';
    subscription.plan = 'free';
  }
  
  await subscription.save();
  return subscription;
}

async function reactivateSubscription(userId) {
  const subscription = await getOrCreateSubscription(userId);
  
  if (subscription.status !== 'cancelled' && !subscription.cancelAtPeriodEnd) {
    throw new SubscriptionError('Subscription is already active', {
      statusCode: 400,
    });
  }
  
  subscription.cancelAtPeriodEnd = false;
  subscription.status = 'active';
  
  await subscription.save();
  return subscription;
}

module.exports = {
  getOrCreateSubscription,
  getUserSubscription,
  getUserPlan,
  updateSubscription,
  checkFeatureAccess,
  requireFeatureAccess,
  updateSubscriptionFromStripe,
  cancelSubscription,
  reactivateSubscription,
};

