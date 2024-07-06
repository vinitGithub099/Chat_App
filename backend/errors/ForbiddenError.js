import httpStatusCodes from "../utils/httpStatusCodes.js";
import AppError from "./AppError.js";

class ForbiddenError extends AppError {
  constructor(description) {
    super("ForbiddenError", httpStatusCodes.FORBIDDEN, description, true);
  }
}

export default ForbiddenError;
