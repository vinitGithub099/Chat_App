const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ForbiddenError = require("../errors/ForbiddenError");
const UnauthorizedError = require("../errors/UnauthorizedError");

/**
 * * middleware to check if user has access token
 * * it authenticates the user
 * @param {*} next: to call next middleware/route
 */
const protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      // verify the token and decodes token id
      const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);

      // find user by the id and attach to req object
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return next(new UnauthorizedError("Not authorized, user not found!"));
      }
      next();
    } catch (error) {
      // Expired token
      return next(new UnauthorizedError("Not authorized, token expired!"));
    }
  } else {
    return next(new UnauthorizedError("Not authorized, token missing in request!"));
  }
};

module.exports = { protect };
