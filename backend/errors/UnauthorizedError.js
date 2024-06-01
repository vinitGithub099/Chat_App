const httpStatusCodes = require("../utils/httpStatusCodes.js");
const AppError = require("./AppError.js");

class UnauthorizedError extends AppError {
  constructor(description) {
    super("UnauthorizedError", httpStatusCodes.UNAUTHORIZED, description, true);
  }
}

module.exports = UnauthorizedError;
