import httpStatusCodes from "../utils/httpStatusCodes.js";
import AppError from "./AppError.js";

class ConflictError extends AppError {
  constructor(description) {
    super("ConflictError", httpStatusCodes.CONFLICT, description, true);
  }
}

export default ConflictError;
