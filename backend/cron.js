const cron = require('node-cron');
const RecurringTransactions = require('./models/RecurringTransactions');
const IncomeExpense = require('./models/IncomeExpense');
const { calculateNextDueDate } = require('./utils');

cron.schedule('0 0 * * *', async () => {
    console.info('=== Running Recurring Transactions Cron ===');

    try {
        const now = new Date();

        const dueRecurringTransactions = await RecurringTransactions.find({
            nextDueDate: { $lte: now },
        });

        for (const item of dueRecurringTransactions) {
            try {
                await IncomeExpense.create({
                    user: item.user,
                    name: item.name,
                    category: item.category,
                    cost: item.amount,
                    isIncome: item.isIncome,
                    date: item.nextDueDate,
                });

                item.nextDueDate = calculateNextDueDate(item.startDate, item.frequency, item.nextDueDate);
                await item.save();

            } catch (err) {
                console.error(`Failed to create transaction for ${item.name}:`, err.message);
            }
        }
    } catch (err) {
        console.error('Cron job failed:', err.message);
    }
});