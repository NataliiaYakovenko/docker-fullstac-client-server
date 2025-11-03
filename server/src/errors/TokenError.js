const ApplicationError = require('./ApplicationError');

class TokenError extends ApplicationError {
  constructor (message) {
    super(message || 'Invalid or expired token', 401);
  }
}

module.exports = TokenError;
