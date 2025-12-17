// routes/cronRoutes.js
const express = require("express");
const router = express.Router();
const { runRecurringTransactions } = require('../controllers/cronController');

router.get("/recurring-transactions", runRecurringTransactions);

module.exports = router;
