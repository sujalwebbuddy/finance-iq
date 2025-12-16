'use strict';

const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  plan: {
    type: String,
    enum: ['free', 'basic', 'pro', 'enterprise'],
    default: 'free',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'past_due', 'trialing'],
    default: 'active',
    required: true,
  },
  stripeCustomerId: {
    type: String,
    sparse: true,
  },
  stripeSubscriptionId: {
    type: String,
    sparse: true,
  },
  currentPeriodStart: {
    type: Date,
  },
  currentPeriodEnd: {
    type: Date,
  },
  cancelAtPeriodEnd: {
    type: Boolean,
    default: false,
  },
  trialEndsAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

subscriptionSchema.index({ status: 1 });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;

