'use strict';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Generate JWT token for authenticated user
 * @param {string} userId - User ID
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

/**
 * Initialize Google OAuth Strategy
 * This service handles Google OAuth authentication flow
 */
const initializeGoogleStrategy = () => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error('Google OAuth credentials are not configured');
  }
  
  const serverUrl = process.env.SERVER_URL || 'http://localhost:5000';

  const callbackURL = process.env.GOOGLE_CALLBACK_URL || 
    `${serverUrl}/api/auth/google/callback`;

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: callbackURL,
      },
      async (_, __, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.toLowerCase();
          
          if (!email) {
            return done(new Error('No email found in Google profile'), null);
          }

          let user = await User.findOne({
            $or: [
              { googleId: profile.id },
              { email: email },
            ],
          });

          if (user) {
            if (!user.googleId) {
              user.googleId = profile.id;
              await user.save();
            }
            return done(null, user);
          }

          user = await User.create({
            email: email,
            googleId: profile.id,
          });

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).select('-password');
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

module.exports = {
  initializeGoogleStrategy,
  generateToken,
};

