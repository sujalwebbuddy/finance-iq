'use strict';

const RecurringTransaction = require('../models/RecurringTransactions');
const { calculateNextDueDate } = require('../utils/calculateNextDueDate');
const subscriptionService = require('../services/subscriptionService');
const usageService = require('../services/usageService');
const { UsageLimitExceededError } = require('../services/errors/SubscriptionError');
const IncomeExpense = require('../models/IncomeExpense');
const mongoose = require('mongoose');

const createRecurringTransaction = async (req, res) => {
    const { name, category, amount, isIncome, frequency, startDate } = req.body;
    let session;

    try {
        if (!name || !category || amount === null || amount === undefined || !frequency || !startDate) {
            return res.status(400).json({ message: 'Please fill in all required fields: name, category, amount, frequency, and start date.' });
        }

        const start = new Date(startDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);

        if (start < today) {
            return res.status(400).json({ 
                message: 'Recurring transactions can only start today or in the future.' 
            });
        }
        const isToday = start.getTime() === today.getTime()
        const userId = req.user.id;
        const plan = await subscriptionService.getUserPlan(userId);
        
        await usageService.checkUsageLimit(userId, plan, 'recurring_transactions', 'monthly');

        session = await mongoose.startSession();
        session.startTransaction();

        const nextDueDate = isToday ? calculateNextDueDate(startDate, frequency) : start;

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

        const createdRecurringTransaction = await recurringTransaction.save({ session });

        if( isToday ) {

            const transaction = new IncomeExpense({
                user: userId,
                name,
                category,
                isIncome,
                note: `Recurring - ${name}`,
                recurringTransaction: createdRecurringTransaction._id,
                addedOn: startDate,
                cost: amount,
            });
    
            await transaction.save({ session });
        }

        if (session) await session.commitTransaction();

        await usageService.incrementUsage(userId, 'recurring_transactions', 'monthly', 1);
        
        res.status(201).json(createdRecurringTransaction);
    } catch (error) {
        if (session) await session.abortTransaction();
        if (error instanceof UsageLimitExceededError) {
            return res.status(error.statusCode).json({
                message: error.message,
                code: error.code,
                context: error.context,
            });
        }
        res.status(500).json({ message: 'Something went wrong. Please try again later.', error: error.message });
    } finally {
        if (session) session.endSession();
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
    let session;
  
    try {
        const updateData = {};
        ['name', 'category', 'amount', 'isIncome', 'frequency', 'startDate']
        .forEach(k => {
            if (req.body[k] !== undefined) {
            updateData[k] = req.body[k];
            }
        });

        const existingRecurring = await RecurringTransaction.findOne({
        _id: req.params.id,
        user: req.user.id
        });

        if (!existingRecurring) {
        return res.status(404).json({
            message: 'This recurring transaction could not be found.'
        });
        }

        const frequency = updateData.frequency;
        const startDate = updateData.startDate;

        let isToday = false;
        let start;

        if (startDate || frequency) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const newStartDate = startDate || existingRecurring.startDate;
        start = new Date(newStartDate);
        start.setHours(0, 0, 0, 0);

        if (start < today) {
            return res.status(400).json({
            message: 'Recurring transactions can only start today or in the future.'
            });
        }

        const newFrequency = frequency || existingRecurring.frequency;
        isToday = start.getTime() === today.getTime();

        updateData.nextDueDate = isToday
            ? calculateNextDueDate(start, newFrequency)
            : start;
        }

        if (isToday) {
        session = await mongoose.startSession();
        session.startTransaction();

        const startOfToday = new Date(start);
        startOfToday.setHours(0, 0, 0, 0);

        const endOfToday = new Date(start);
        endOfToday.setHours(23, 59, 59, 999);

        const existingIncomeExpense = await IncomeExpense.findOne(
            {
            recurringTransaction: existingRecurring._id,
            addedOn: { $gte: startOfToday, $lte: endOfToday }
            },
            null,
            { session }
        );

        const updatedRecurring = await RecurringTransaction.findOneAndUpdate(
            { _id: existingRecurring._id, user: req.user.id },
            updateData,
            { new: true, session }
        );

        if (!updatedRecurring) {
            await session.abortTransaction();
            await session.endSession();
            return res.status(404).json({
            message: 'Recurring transaction not found.'
            });
        }

        if (!existingIncomeExpense) {
            await IncomeExpense.create(
            [{
                user: req.user.id,
                name: updatedRecurring.name,
                category: updatedRecurring.category,
                isIncome: updatedRecurring.isIncome,
                note: `Recurring - ${updatedRecurring.name}`,
                recurringTransaction: updatedRecurring._id,
                addedOn: start,
                cost: updatedRecurring.amount
            }],
            { session }
            );
        }

        await session.commitTransaction();
        await session.endSession();

        return res.json(updatedRecurring);
        }

        const updatedRecurring = await RecurringTransaction.findOneAndUpdate(
        { _id: existingRecurring._id, user: req.user.id },
        updateData,
        { new: true }
        );

        if (!updatedRecurring) {
        return res.status(404).json({
            message: 'Recurring transaction not found.'
        });
        }

        res.json(updatedRecurring);

    } catch (error) {
        if (session) {
        await session.abortTransaction();
        await session.endSession();
        }

        res.status(500).json({
        message: 'Something went wrong. Please try again later.',
        error: error.message
        });
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
