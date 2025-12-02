# FinanceIQ

A comprehensive full-stack financial management application that helps users track expenses, manage budgets, process receipts with AI, and gain insights into their financial habits.

## 🌐 Live Demo

- **Frontend**: [https://finance-iq-pearl.vercel.app](https://finance-iq-pearl.vercel.app)
- **Backend API**: [https://finance-iq.onrender.com](https://finance-iq.onrender.com)
- **Repository**: [https://github.com/WebBuddy-Marketplace/finance-iq](https://github.com/WebBuddy-Marketplace/finance-iq)

## 🚀 Features

### Core Functionality
- **Transaction Management**: Track income and expenses with detailed categorization
- **Budget Planning**: Create and manage budgets with spending limits and alerts
- **AI-Powered Receipt Processing**: Upload receipts and automatically extract transaction details using Google Gemini AI
- **Recurring Transactions**: Set up and manage recurring income and expenses
- **Financial Dashboard**: Visualize your financial data with interactive charts and analytics
- **Multi-Currency Support**: Track transactions in multiple currencies
- **Dark Mode**: Beautiful dark and light themes for comfortable viewing

### User Features
- **Authentication**: Secure login with email/password or Google OAuth
- **Subscription Plans**: Choose from Basic, Pro, or Enterprise plans with Stripe integration
- **Usage Tracking**: Monitor feature usage and limits based on subscription tier
- **Data Export**: Export transaction data for external analysis

### Security & Privacy
- JWT-based authentication
- Secure session management
- Input sanitization and validation
- Protected API routes
- Privacy policy and terms of use

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Passport.js (Google OAuth)
- **Payment Processing**: Stripe
- **AI Integration**: Google Gemini API
- **File Upload**: Multer
- **Validation**: Express Validator
- **Scheduling**: Node Cron

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Charts**: Chart.js with React Chart.js 2
- **Icons**: Lucide React, React Icons
- **Notifications**: React Toastify
- **HTTP Client**: Axios

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Git**

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/WebBuddy-Marketplace/finance-iq.git
cd finance-iq
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory based on `example.env`:

```bash
cp example.env .env
```

Configure your environment variables in `backend/.env`:

```env
# Database Configuration
MONGO_URI=your_mongodb_connection_string

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_change_in_production

# Session Configuration (for OAuth)
SESSION_SECRET=your_session_secret_key_change_in_production

# Backend URL (used for OAuth callback configuration)
SERVER_URL=http://localhost:5000

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Gemini API (for receipt processing)
GEMINI_API_KEY=your_gemini_api_key

# Keep Alive URL (optional, for server keep-alive pings)
KEEP_ALIVE_URL=

# Stripe Configuration (for subscription payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRICE_ID_BASIC=price_your_basic_plan_price_id
STRIPE_PRICE_ID_PRO=price_your_pro_plan_price_id
STRIPE_PRICE_ID_ENTERPRISE=price_your_enterprise_plan_price_id
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory based on `example.env`:

```bash
cp example.env .env
```

Configure your environment variables in `frontend/.env`:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=FinanceIQ
VITE_APP_DESCRIPTION=The best AI financial manager
```

## 🚀 Running the Application

### Development Mode

**Backend:**
```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

**Frontend:**
```bash
cd frontend
npm run dev
```

The frontend application will start on `http://localhost:5173`

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
finance-iq/
├── backend/
│   ├── config/          # Database and configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware (auth, validation, etc.)
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # Business logic and external services
│   ├── uploads/         # Uploaded files (receipts)
│   ├── cron.js          # Scheduled tasks
│   └── server.js        # Express server entry point
├── frontend/
│   ├── public/          # Static assets
│   └── src/
│       ├── api/         # API client configuration
│       ├── components/  # React components
│       ├── config/      # App configuration
│       ├── contexts/    # React contexts (Auth, Theme, Currency)
│       ├── hooks/       # Custom React hooks
│       ├── pages/       # Page components
│       ├── services/    # API service functions
│       └── utils/       # Utility functions
├── document/            # Documentation files
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
└── LICENSE
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback
- `POST /api/auth/logout` - Logout user

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction
- `GET /api/transactions/summary` - Get transaction summary
- `GET /api/transactions/charts` - Get chart data

### Budgets
- `GET /api/budgets` - Get all budgets
- `POST /api/budgets` - Create a new budget
- `PUT /api/budgets/:id` - Update a budget
- `DELETE /api/budgets/:id` - Delete a budget

### Receipts
- `GET /api/receipts` - Get all receipts
- `POST /api/receipts` - Upload and process a receipt
- `DELETE /api/receipts/:id` - Delete a receipt

### Recurring Transactions
- `GET /api/recurring` - Get all recurring transactions
- `POST /api/recurring` - Create a recurring transaction
- `PUT /api/recurring/:id` - Update a recurring transaction
- `DELETE /api/recurring/:id` - Delete a recurring transaction

### Subscriptions
- `GET /api/subscriptions` - Get user subscription
- `POST /api/subscriptions` - Create a subscription
- `PUT /api/subscriptions` - Update a subscription
- `DELETE /api/subscriptions` - Cancel a subscription

### Stripe
- `POST /api/stripe/create-checkout-session` - Create Stripe checkout session
- `POST /api/stripe/webhook` - Stripe webhook handler

## 🧪 Testing

Run tests for both backend and frontend:

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 Code Quality

This project follows strict coding standards:

- **Linting**: ESLint with strict mode
- **Code Style**: Prettier formatting
- **Architecture**: Clean Architecture principles
- **Error Handling**: Comprehensive error handling with context

Run linting:

```bash
# Backend
cd backend
npm run lint

# Frontend
cd frontend
npm run lint
```

## 🚢 Deployment

The project includes documentation for deploying to various platforms:

- **Frontend**: See `document/install-netlify.html`, `document/install-vercel.html`
- **Backend**: See `document/install-render.html`, `document/install-aws-ec2.html`
- **Database**: See `document/mongodb-setup.html`

Refer to the `document/` directory for detailed deployment instructions.

### Current Deployment
- **Frontend**: Deployed on Vercel at [https://finance-iq-pearl.vercel.app](https://finance-iq-pearl.vercel.app)
- **Backend**: Deployed on Render at [https://finance-iq.onrender.com](https://finance-iq.onrender.com)

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting pull requests.

### Contribution Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Archa**

## 🙏 Acknowledgments

- Built with modern web technologies
- Uses Google Gemini AI for intelligent receipt processing
- Integrated with Stripe for secure payment processing

## 📞 Support

For support, visit our [Contact Page](https://finance-iq-pearl.vercel.app/contact).

## 🔗 Links

- [Live Application](https://finance-iq-pearl.vercel.app)
- [API Documentation](https://finance-iq.onrender.com)
- [Documentation](document/)
- [Issues](https://github.com/WebBuddy-Marketplace/finance-iq/issues)
- [Pull Requests](https://github.com/WebBuddy-Marketplace/finance-iq/pulls)

---

Made with ❤️ by the WebBuddy team

