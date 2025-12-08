'use strict';

const nodemailer = require('nodemailer');
const { DEFAULT_EMAIL_PORT, DEFAULT_EMAIL_FROM_NAME, ERROR_CODES } = require('../config/constants');

const createTransporter = () => {
  const emailHost = process.env.EMAIL_HOST;
  const emailPort = parseInt(process.env.EMAIL_PORT, 10) || DEFAULT_EMAIL_PORT;
  const emailSecure = process.env.EMAIL_SECURE === 'true';
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailHost || !emailUser || !emailPass) {
    throw new Error('Email configuration is incomplete. Please check EMAIL_HOST, EMAIL_USER, and EMAIL_PASS environment variables.');
  }

  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: emailSecure,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  return transporter;
};

const buildFromAddress = () => {
  const fromName = process.env.EMAIL_FROM_NAME || DEFAULT_EMAIL_FROM_NAME;
  const emailUser = process.env.EMAIL_USER;

  return `"${fromName}" <${emailUser}>`;
};

const sendEmail = async (mailOptions) => {
  if (!mailOptions.to || !mailOptions.subject || !mailOptions.html) {
    throw new Error('Email options must include to, subject, and html fields.');
  }

  const transporter = createTransporter();
  const defaultOptions = {
    from: buildFromAddress(),
  };

  const finalOptions = { ...defaultOptions, ...mailOptions };

  try {
    await transporter.sendMail(finalOptions);
  } catch (error) {
    const mailError = new Error('Failed to send email');
    mailError.code = ERROR_CODES.MAIL_ERROR;
    mailError.originalError = error;
    throw mailError;
  }
};

module.exports = {
  createTransporter,
  sendEmail,
};
