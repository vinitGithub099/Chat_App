import jwt from "jsonwebtoken";

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "2d",
  });
};

export { generateAccessToken, generateRefreshToken };
