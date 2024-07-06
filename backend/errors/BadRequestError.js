import httpStatusCodes from "../utils/httpStatusCodes.js";
import AppError from "./AppError.js";

class BadRequestError extends AppError {
  constructor(description) {
    super("BadRequestError", httpStatusCodes.BAD_REQUEST, description, true);
  }
}

export default BadRequestError;
