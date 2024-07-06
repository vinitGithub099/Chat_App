import httpStatusCodes from "../utils/httpStatusCodes.js";
import AppError from "./AppError.js";

class UnauthorizedError extends AppError {
  constructor(description) {
    super("UnauthorizedError", httpStatusCodes.UNAUTHORIZED, description, true);
  }
}

export default UnauthorizedError;
