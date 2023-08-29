const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originUrl}`);
  res.status(404);
  next(error);
};

/**
 * * middleware to handle error if no middleware/route is caught before it
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
  });
};

module.exports = { notFound, errorHandler };
