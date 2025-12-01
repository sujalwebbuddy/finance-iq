'use strict';

const stripeService = require('../services/stripeService');
const subscriptionService = require('../services/subscriptionService');
const User = require('../models/User');

async function createCheckoutSession(req, res) {
  try {
    const userId = req.user.id;
    const { plan } = req.body;
    
    if (!plan || !['basic', 'pro', 'enterprise'].includes(plan)) {
      return res.status(400).json({
        message: 'Invalid plan. Must be one of: basic, pro, enterprise',
      });
    }
    
    const priceId = stripeService.PLAN_PRICE_IDS[plan];
    if (!priceId) {
      return res.status(400).json({
        message: `Price ID not configured for plan: ${plan}`,
      });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const subscription = await subscriptionService.getUserSubscription(userId);
    let customerId = subscription.stripeCustomerId;
    
    if (!customerId) {
      const customer = await stripeService.createCustomer(user.email, userId);
      customerId = customer.id;
      await subscriptionService.updateSubscription(userId, {
        stripeCustomerId: customerId,
      });
    }
    
    const session = await stripeService.createCheckoutSession(
      customerId,
      priceId,
      userId
    );
    
    res.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      message: error.message || 'Error creating checkout session',
      error: error.message,
    });
  }
}

async function handleWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;
  
  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (error) {
    return res.status(400).json({
      message: `Webhook signature verification failed: ${error.message}`,
    });
  }
  
  try {
    await stripeService.handleWebhookEvent(event);
    res.json({ received: true });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      message: error.message || 'Error processing webhook',
      error: error.message,
    });
  }
}

module.exports = {
  createCheckoutSession,
  handleWebhook,
};

