export const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originUrl}`);
  res.status(404);
  next(error);
};

/* middleware to handle error if no middleware/route is caught before it */
export const errorHandler = (err, req, res, next) => {
  res
    .status(err?.httpCode || 500)
    .json(err?.toJSON() || "something is misconfigured");
};
