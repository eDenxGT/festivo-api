export const ERROR_MESSAGES = {
  // Server Errors
  SERVER: {
    INTERNAL_SERVER_ERROR: 'Internal server error. Please try again later.',
    SERVICE_UNAVAILABLE:
      'Service is currently unavailable. Please try again later.'
  },

  // Client Errors
  CLIENT: {
    NOT_FOUND: 'The requested resource was not found.',
    FORBIDDEN: "Forbidden. You don't have permission to access this resource.",
    UNAUTHORIZED: 'Unauthorized access. Please log in.',

    INVALID_PRICE: 'Please enter a price.',

    INVALID_PARAMS: 'Invalid Parameters.',

    TOKEN_EXPIRED: 'Token Expired. Please log in',
    INVALID_TOKEN: 'Invalid Token',

    ACCOUNT_EXISTS: 'Account already exists',
    ACCOUNT_NOT_FOUND: 'Account not exists',
    INVALID_CREDENTIALS: 'Invalid credentials',
    VALIDATION_FAILED: 'Validation Failed',

    REGISTRATION_EXISTS: 'You already registered for this event'
  }
};
