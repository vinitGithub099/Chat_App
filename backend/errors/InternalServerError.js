import httpStatusCodes from "../utils/httpStatusCodes.js";
import AppError from "./AppError.js";

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

export default InternalServerError;
