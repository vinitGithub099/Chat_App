class AppError extends Error {
  constructor(name, httpCode, description, isOperational) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      httpCode: this.httpCode,
      isOperational: this.isOperational,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}

export default AppError;
