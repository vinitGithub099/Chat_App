import httpStatusCodes from "../utils/httpStatusCodes.js";
import AppError from "./AppError.js";

class NotFoundError extends AppError {
  constructor(description) {
    super("NotFoundError", httpStatusCodes.NOT_FOUND, description, true);
  }
}

export default NotFoundError;
