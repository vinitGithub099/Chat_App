const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ForbiddenError = require("../errors/ForbiddenError");
const UnauthorizedError = require("../errors/UnauthorizedError");

/**
 * * middleware to check if user has JWT token
 * * it authenticates the user
 * @param {*} next: to call next middleware/route
 */
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      /* decodes token id */
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      /* Expired token */
      return next(new ForbiddenError("token expired!"));
    }
  }
};

module.exports = { protect };
