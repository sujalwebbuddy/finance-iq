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
        message: 'Please select a valid plan: Basic, Pro, or Enterprise.',
      });
    }
    
    const priceId = stripeService.PLAN_PRICE_IDS[plan];
    if (!priceId) {
      return res.status(400).json({
        message: 'This plan is currently unavailable. Please contact support for assistance.',
      });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Your account could not be found. Please sign in again.' });
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
      message: error.message || 'We couldn\'t process your subscription upgrade. Please try again.',
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
      message: 'Payment verification failed. Please contact support if this issue persists.',
    });
  }
  
  try {
    await stripeService.handleWebhookEvent(event);
    res.json({ received: true });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      message: error.message || 'We couldn\'t process your payment. Please try again.',
      error: error.message,
    });
  }
}

module.exports = {
  createCheckoutSession,
  handleWebhook,
};

