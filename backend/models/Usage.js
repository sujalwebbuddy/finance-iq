'use strict';

const mongoose = require('mongoose');

const usageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  metric: {
    type: String,
    enum: [
      'transactions',
      'receipts',
      'budgets',
      'recurring_transactions',
      'exports',
      'api_requests',
    ],
    required: true,
  },
  count: {
    type: Number,
    default: 0,
    required: true,
  },
  period: {
    type: String,
    enum: ['daily', 'monthly'],
    required: true,
  },
  periodDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

usageSchema.index({ user: 1, metric: 1, period: 1, periodDate: 1 }, { unique: true });
usageSchema.index({ user: 1, periodDate: -1 });

const Usage = mongoose.model('Usage', usageSchema);

module.exports = Usage;

