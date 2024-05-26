const httpStatusCodes = require("../utils/httpStatusCodes.js");
const AppError = require("./AppError.js");

class ForbiddenError extends AppError {
  constructor(description) {
    super("ForbiddenError", httpStatusCodes.FORBIDDEN, description, true);
  }
}

module.exports = ForbiddenError;
