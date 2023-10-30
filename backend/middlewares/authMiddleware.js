const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

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
      console.log("backend: ", token);
      // decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log("Expired token");
      res.status(403).send("Not authorized, Expired token failed");
      // throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    console.log("token not received");
    res.status(401).send("Token not received");
    // throw new Error("Not authorized, no token found");
  }
};

module.exports = { protect };
