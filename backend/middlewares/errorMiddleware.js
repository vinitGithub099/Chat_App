import AppError from "../errors/AppError.js";

export const notFound = (req, res, next) => {
  const error = new AppError(`Not found - ${req.originUrl}`);
  next(error);
};

/* middleware to handle error if no middleware/route is caught before it */
export const errorHandler = (err, req, res, next) => {
  res
    .status(err?.httpCode || 500)
    .json(err?.toJSON() || "something is misconfigured");
};
