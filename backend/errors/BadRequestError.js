const httpStatusCodes = require("../utils/httpStatusCodes.js");
const AppError = require("./AppError.js");

class BadRequestError extends AppError {
  constructor(description) {
    super("BadRequestError", httpStatusCodes.BAD_REQUEST, description, true);
  }
}

module.exports = BadRequestError;
