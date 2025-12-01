'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const subscriptionService = require('./subscriptionService');
const { SubscriptionError } = require('./errors/SubscriptionError');

const PLAN_PRICE_IDS = {
  basic: process.env.STRIPE_PRICE_ID_BASIC,
  pro: process.env.STRIPE_PRICE_ID_PRO,
  enterprise: process.env.STRIPE_PRICE_ID_ENTERPRISE,
};

async function createCustomer(email, userId) {
  try {
    const customer = await stripe.customers.create({
      email,
      metadata: {
        userId: userId.toString(),
      },
    });
    
    return customer;
  } catch (error) {
    throw new SubscriptionError(
      'Failed to create Stripe customer',
      {
        originalError: error,
        statusCode: 500,
      }
    );
  }
}

async function createCheckoutSession(customerId, priceId, userId) {
  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/settings?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/settings?canceled=true`,
      subscription_data: {
        metadata: {
          userId: userId.toString(),
        },
      },
    });
    
    return session;
  } catch (error) {
    throw new SubscriptionError(
      'Failed to create checkout session',
      {
        originalError: error,
        statusCode: 500,
      }
    );
  }
}

async function createSubscription(customerId, priceId) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
    });
    
    return subscription;
  } catch (error) {
    throw new SubscriptionError(
      'Failed to create subscription',
      {
        originalError: error,
        statusCode: 500,
      }
    );
  }
}

async function cancelStripeSubscription(subscriptionId, cancelAtPeriodEnd = true) {
  try {
    if (cancelAtPeriodEnd) {
      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });
    } else {
      await stripe.subscriptions.cancel(subscriptionId);
    }
    
    return true;
  } catch (error) {
    throw new SubscriptionError(
      'Failed to cancel Stripe subscription',
      {
        originalError: error,
        statusCode: 500,
      }
    );
  }
}

async function reactivateStripeSubscription(subscriptionId) {
  try {
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });
    
    return true;
  } catch (error) {
    throw new SubscriptionError(
      'Failed to reactivate Stripe subscription',
      {
        originalError: error,
        statusCode: 500,
      }
    );
  }
}

async function handleWebhookEvent(event) {
  const { type, data } = event;
  
  switch (type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = data.object;
      let userId = subscription.metadata?.userId;
      
      if (!userId) {
        const customer = await stripe.customers.retrieve(subscription.customer);
        userId = customer.metadata?.userId;
      }
      
      if (!userId) {
        throw new SubscriptionError(
          'User ID not found in subscription or customer metadata',
          {
            subscriptionId: subscription.id,
            customerId: subscription.customer,
          }
        );
      }
      
      const plan = getPlanFromPriceId(subscription.items.data[0]?.price?.id);
      
      await subscriptionService.updateSubscriptionFromStripe(userId, {
        customerId: subscription.customer,
        subscriptionId: subscription.id,
        status: subscription.status,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      });
      
      if (plan) {
        await subscriptionService.updateSubscription(userId, { plan });
      }
      
      break;
    }
    
    case 'customer.subscription.deleted': {
      const subscription = data.object;
      let userId = subscription.metadata?.userId;
      
      if (!userId) {
        const customer = await stripe.customers.retrieve(subscription.customer);
        userId = customer.metadata?.userId;
      }
      
      if (userId) {
        await subscriptionService.updateSubscription(userId, {
          status: 'cancelled',
          plan: 'free',
        });
      }
      
      break;
    }
    
    default:
      break;
  }
}

function getPlanFromPriceId(priceId) {
  for (const [plan, id] of Object.entries(PLAN_PRICE_IDS)) {
    if (id === priceId) {
      return plan;
    }
  }
  return null;
}

module.exports = {
  createCustomer,
  createCheckoutSession,
  createSubscription,
  cancelStripeSubscription,
  reactivateStripeSubscription,
  handleWebhookEvent,
  PLAN_PRICE_IDS,
};

