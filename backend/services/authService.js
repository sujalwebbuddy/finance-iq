'use strict';

const crypto = require('crypto');
const User = require('../models/User');
const { AuthError } = require('./errors/AuthError');
const { sendEmail } = require('../utils/mail');
const { generatePasswordResetEmail } = require('../utils/emailTemplates');
const {
  RESET_TOKEN_EXPIRY_MINUTES,
  RESET_TOKEN_BYTES,
  PASSWORD_RESET_EMAIL_SUBJECT,
  SUCCESS_MESSAGES,
  ERROR_CODES,
} = require('../config/constants');

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
const MILLISECONDS_PER_MINUTE = 60 * 1000;

const generateResetToken = () => {
  const resetToken = crypto.randomBytes(RESET_TOKEN_BYTES).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const expiresIn = Date.now() + (RESET_TOKEN_EXPIRY_MINUTES * MILLISECONDS_PER_MINUTE);

  return {
    resetToken,
    hashedToken,
    expiresIn,
  };
};

const sendResetPasswordEmail = async (email, resetToken) => {
  const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

  try {
    await sendEmail({
      to: email,
      subject: PASSWORD_RESET_EMAIL_SUBJECT,
      html: generatePasswordResetEmail(resetUrl),
    });
  } catch (error) {
    console.error(error);
    throw new AuthError('We couldn\'t send the password reset email. Please check your email address and try again.', {
      code: ERROR_CODES.EMAIL_SEND_FAILED,
      statusCode: 500,
      originalError: error,
    });
  }
};

const clearResetToken = async (user) => {
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
};

const initiatePasswordReset = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    return {
      success: true,
      message: SUCCESS_MESSAGES.PASSWORD_RESET_INITIATED,
    };
  }

  const { resetToken, hashedToken, expiresIn } = generateResetToken();

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = expiresIn;
  await user.save();

  try {
    await sendResetPasswordEmail(email, resetToken);
    return {
      success: true,
      message: SUCCESS_MESSAGES.PASSWORD_RESET_INITIATED,
    };
  } catch (error) {
    await clearResetToken(user);
    throw error;
  }
};

const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

const resetPassword = async (token, newPassword) => {
  const hashedToken = hashToken(token);
  const currentTime = Date.now();

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: currentTime },
  });

  if (!user) {
    throw new AuthError('This password reset link is invalid or has expired. Please request a new password reset.', {
      code: ERROR_CODES.INVALID_RESET_TOKEN,
      statusCode: 400,
    });
  }

  user.password = newPassword;
  await clearResetToken(user);

  return {
    success: true,
    message: SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS,
  };
};

module.exports = {
  initiatePasswordReset,
  resetPassword,
};
