const RecurringTransactions = require("../models/RecurringTransactions");
const IncomeExpense = require("../models/IncomeExpense");
const { calculateNextDueDate } = require("../utils/calculateNextDueDate");

exports.runRecurringTransactions = async (req, res) => {
  // Protect endpoint – only Vercel cron
  console.info('Running recurring transactions cron');
  if (req.query.secret !== process.env.CRON_SECRET) {
    console.info("Unauthorized cron attempt");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const now = new Date();
    let processed = 0;

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
          addedOn: item.nextDueDate,
          recurringTransaction: item._id,
        });

        item.nextDueDate = calculateNextDueDate(
          item.startDate,
          item.frequency,
          item.nextDueDate
        );

        await item.save();
        processed++;
      } catch (err) {
        if (err.code === 11000) continue;
        console.error(`Failed processing recurring ${item._id}:`, err.message);
      }
    }

    console.info(`Processed: ${processed}`);

    return res.status(200).json({
      success: true,
      processed,
    });
  } catch (err) {
    console.error("Recurring cron failed:", err);
    return res.status(500).json({ error: "Cron failed" });
  }
};
