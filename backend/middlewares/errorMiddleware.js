const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originUrl}`);
  res.status(404);
  next(error);
};

/**
 * * middleware to handle error if no middleware/route is caught before it
 */
const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

module.exports = { notFound, errorHandler };
