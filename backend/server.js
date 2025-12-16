'use strict';

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
const axios = require('axios');
const cron = require('node-cron');
const { initializeGoogleStrategy } = require('./services/googleOAuthService');
require('./cron');

// import the sanitizeMiddleware
const { sanitizeMiddleware } = require("./middleware/sanitizeMiddleware");

// Load environment variables
dotenv.config();

const ALLOWED_CORS_ORIGIN = process.env.FRONTEND_URL || 'http://localhost:5173';
const PORT = process.env.PORT || 5000;
const SESSION_SECRET = process.env.SESSION_SECRET || process.env.JWT_SECRET || 'default-secret';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to database
connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  ALLOWED_CORS_ORIGIN,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Stripe webhook route MUST be registered before express.json()
// because Stripe needs the raw body to verify the webhook signature
app.use(
  '/api/stripe/webhook',
  express.raw({ type: 'application/json' }),
  require('./controllers/stripeController').handleWebhook
);

app.use(express.json());

// Session configuration for OAuth
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Initialize Google OAuth Strategy
try {
  initializeGoogleStrategy();
} catch (error) {
  console.warn('Google OAuth not configured:', error.message);
}

// sanitizeMiddleware
app.use(sanitizeMiddleware());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/receipts', require('./routes/receiptRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/budgets', require('./routes/budgetRoutes'));
app.use('/api/recurring', require('./routes/recurringTransactionRoutes'));
app.use('/api/subscriptions', require('./routes/subscriptionRoutes'));
app.use('/api/stripe', require('./routes/stripeRoutes'));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('API is Running');
});

let server = null;

if (process.env.IS_VERCEL !== 'true') {
  server = app.listen(PORT, () =>
    console.info(`Server started on port ${PORT}`)
  );

  cron.schedule("*/10 * * * *", async () => {
    const keepAliveUrl = process.env.KEEP_ALIVE_URL;
    if (!keepAliveUrl) {
      console.error(
        "KEEP_ALIVE_URL environment variable is not set. Skipping keep-alive ping."
      );
      return;
    }

    try {
      await axios.get(keepAliveUrl);
      console.info("Keep-alive ping sent!");
    } catch (error) {
      console.error("Keep-alive FAILED!", error.message);
    }
  });
}

module.exports = { app, server };
