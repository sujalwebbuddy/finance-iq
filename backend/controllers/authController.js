'use strict';

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const authService = require('../services/authService');

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

// Function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password to create an account.' });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'An account with this email already exists. Please sign in instead.' });
    }

    const user = await User.create({
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Unable to create account. Please check your information and try again.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again later.', error: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'The email or password you entered is incorrect. Please try again.' });
    }

    if (!user.password) {
      if (user.googleId) {
        return res.status(401).json({ 
          message: 'This account uses Google Sign-In. Please sign in with Google.' 
        });
      }
      return res.status(401).json({ message: 'The email or password you entered is incorrect. Please try again.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (isPasswordValid) {
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
        isSetupComplete: user.isSetupComplete,
        defaultCurrency: user.defaultCurrency,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again later.', error: error.message });
  }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  // The user is already available in req.user
  res.status(200).json(req.user);
};

// @desc    Complete user setup
// @route   PUT /api/auth/setup
// @access  Private
const completeSetup = async (req, res) => {
  const { defaultCurrency } = req.body;

  if (!defaultCurrency) {
      return res.status(400).json({ message: 'Please select a default currency for your account.' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 
        defaultCurrency,
        isSetupComplete: true 
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Your account could not be found. Please sign in again.' });
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      defaultCurrency: user.defaultCurrency,
      isSetupComplete: user.isSetupComplete,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again later.', error: error.message });
  }
};

// @desc    Initiate Google OAuth authentication
// @route   GET /api/auth/google
// @access  Public
const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

// @desc    Google OAuth callback handler
// @route   GET /api/auth/google/callback
// @access  Public
const googleCallback = passport.authenticate('google', {
  failureRedirect: frontendUrl + '/login?error=google_auth_failed',
  session: false,
});

// @desc    Handle successful Google OAuth authentication
// @route   GET /api/auth/google/success
// @access  Public
const googleSuccess = async (req, res) => {
  try {

    if (!req.user) {
      return res.redirect(
        frontendUrl + '/login?error=google_auth_failed'
      );
    }

    const token = generateToken(req.user._id);
    const redirectUrl = new URL(frontendUrl + '/auth/google/callback');
    redirectUrl.searchParams.set('token', token);
    redirectUrl.searchParams.set('userId', req.user._id.toString());
    redirectUrl.searchParams.set('email', req.user.email);
    redirectUrl.searchParams.set('isSetupComplete', req.user.isSetupComplete ? 'true' : 'false');
    redirectUrl.searchParams.set('defaultCurrency', req.user.defaultCurrency || 'USD');

    res.redirect(redirectUrl.toString());
  } catch (error) {
    res.redirect(
      frontendUrl + '/login?error=server_error'
    );
  }
};

// @desc    Request password reset
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.initiatePasswordReset(email);
    res.status(200).json(result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const response = {
      message: error.message,
    };

    if (error.code) {
      response.code = error.code;
    }

    res.status(statusCode).json(response);
  }
};

// @desc    Reset password with token
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const result = await authService.resetPassword(token, password);
    res.status(200).json(result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const response = {
      message: error.message,
    };

    if (error.code) {
      response.code = error.code;
    }

    res.status(statusCode).json(response);
  }
};

module.exports = {
  signup,
  login,
  getMe,
  completeSetup,
  forgotPassword,
  resetPassword,
  googleAuth,
  googleCallback,
  googleSuccess,
};