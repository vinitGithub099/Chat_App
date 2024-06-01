const httpStatusCodes = require("../utils/httpStatusCodes.js");
const AppError = require("./AppError.js");

class NotFoundError extends AppError {
  constructor(description) {
    super("NotFoundError", httpStatusCodes.NOT_FOUND, description, true);
  }
}

module.exports = NotFoundError;
