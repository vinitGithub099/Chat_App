const jwt = require("jsonwebtoken");

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "1m",
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "2m",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
