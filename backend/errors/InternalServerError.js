const httpStatusCodes = require("../utils/httpStatusCodes.js");
const AppError = require("./AppError.js");

class InternalServerError extends AppError {
  constructor(description) {
    super(
      "InternalServerError",
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      description,
      true
    );
  }
}

module.exports = InternalServerError;
