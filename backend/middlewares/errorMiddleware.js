const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originUrl}`);
  res.status(404);
  next(error);
};

/* middleware to handle error if no middleware/route is caught before it */
const errorHandler = (err, req, res, next) => {
  res.status(err.httpCode).json(err.toJSON());
};

module.exports = { notFound, errorHandler };
