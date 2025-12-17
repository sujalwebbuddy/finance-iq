'use strict';

const RecurringTransaction = require('../models/RecurringTransactions');
const { calculateNextDueDate } = require('../utils/calculateNextDueDate');
const subscriptionService = require('../services/subscriptionService');
const usageService = require('../services/usageService');
const { UsageLimitExceededError } = require('../services/errors/SubscriptionError');

const createRecurringTransaction = async (req, res) => {
    const { name, category, amount, isIncome, frequency, startDate } = req.body;

    try {
        if (!name || !category || !amount || !frequency || !startDate) {
            return res.status(400).json({ message: 'Please fill in all required fields: name, category, amount, frequency, and start date.' });
        }

        // Ensure startDate is today or in the future
        const start = new Date(startDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);

        if (start < today) {
            return res.status(400).json({ 
                message: 'Recurring transactions can only start today or in the future.' 
            });
        }

        const userId = req.user.id;
        const plan = await subscriptionService.getUserPlan(userId);
        
        await usageService.checkUsageLimit(userId, plan, 'recurring_transactions', 'monthly');

        const nextDueDate = calculateNextDueDate(startDate, frequency);

        const recurringTransaction = new RecurringTransaction({
            user: userId,
            name,
            category,
            amount,
            isIncome,
            frequency,
            startDate,
            nextDueDate,
        });

        const createdRecurringTransaction = await recurringTransaction.save();
        
        await usageService.incrementUsage(userId, 'recurring_transactions', 'monthly', 1);
        
        res.status(201).json(createdRecurringTransaction);
    } catch (error) {
        if (error instanceof UsageLimitExceededError) {
            return res.status(error.statusCode).json({
                message: error.message,
                code: error.code,
                context: error.context,
            });
        }
        res.status(500).json({ message: 'Something went wrong. Please try again later.', error: error.message });
    }
};


const getRecurringTransactions = async (req, res) => {
    try {
        const transactions = await RecurringTransaction.find({ user: req.user.id });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.', error: error.message });
    }
};


const updateRecurringTransaction = async (req, res) => {
    try {
        const { name, category, amount, isIncome, frequency, startDate } = req.body;

        const updateData = { name, category, amount, isIncome, frequency, startDate };

        if (startDate || frequency) {
            const transaction = await RecurringTransaction.findOne({ _id: req.params.id, user: req.user.id });
            if (!transaction) {
                return res.status(404).json({ message: 'This recurring transaction could not be found.' });
            }

            const newStartDate = startDate || transaction.startDate;
            const newFrequency = frequency || transaction.frequency;
            updateData.nextDueDate = calculateNextDueDate(newStartDate, newFrequency);
        }

        const updated = await RecurringTransaction.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            updateData,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Recurring transaction not found' });
        }

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.', error: error.message });
    }
};


const deleteRecurringTransaction = async (req, res) => {
    try {
        const deleted = await RecurringTransaction.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Recurring transaction not found' });
        }

        await usageService.decrementUsage(req.user.id, 'recurring_transactions', 'monthly', 1);

        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.', error: error.message });
    }
};

module.exports = {
    createRecurringTransaction,
    getRecurringTransactions,
    updateRecurringTransaction,
    deleteRecurringTransaction,
};
