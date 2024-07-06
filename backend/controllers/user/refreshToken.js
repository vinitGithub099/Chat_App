import jwt from "jsonwebtoken";
import UnauthorizedError from "../../errors/UnauthorizedError.js";
import { generateAccessToken } from "../../utils/generateToken.js";

/**
 * * status: working
 * @description Refresh Token
 * @method GET /api/user/refresh-token
 * @purpose to renew the access token
 */
export const refreshToken = async (req, res, next) => {
  // get refresh token from cookies
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(new UnauthorizedError("Refresh token not found!"));
  }

  try {
    // verify the authencity of the refresh token,
    // if invalid/expired --> error caught in the catch block
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

    // if the refresh token is valid then generate new access token
    const accessToken = generateAccessToken(decoded.id);

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    return next(new UnauthorizedError("Failed to verify refresh token!"));
  }
};