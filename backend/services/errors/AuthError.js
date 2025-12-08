'use strict';

class AuthError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'AuthError';
    this.code = options.code || 'AUTH_ERROR';
    this.statusCode = options.statusCode || 500;
    this.context = options.context || {};
    this.originalError = options.originalError;

    if (this.originalError) {
      this.stack += '\nCaused by: ' + this.originalError.stack;
    }
  }
}

module.exports = {
  AuthError,
};
