const httpStatusCodes = require("../utils/httpStatusCodes.js");
const AppError = require("./AppError.js");

class ConflictError extends AppError {
  constructor(description) {
    super("ConflictError", httpStatusCodes.CONFLICT, description, true);
  }
}

module.exports = ConflictError;
