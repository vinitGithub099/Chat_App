import BadRequestError from "../../errors/BadRequestError.js";
import InternalServerError from "../../errors/InternalServerError.js";
import NotFoundError from "../../errors/NotFoundError.js";
import UnauthorizedError from "../../errors/UnauthorizedError.js";
import User from "../../models/userModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";

/**
 * * status: working
 * @description Login user
 * @method POST /api/user/login
 * @purpose to login a previously registered user into the database/app
 */
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Fields are missing!"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new NotFoundError("User doesn't exists!"));
    }

    // compare password provided in the request with that in the DB
    const isPswdMatched = await user.matchPassword(password);

    // if passwords match then generate new tokens
    if (isPswdMatched) {
      const accessToken = generateAccessToken(user._id);

      // refresh token is generated during login only
      const refreshToken = generateRefreshToken(user._id);

      // store the refresh token in the cookies and send the access token in response
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          expire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
          user: user,
          accessToken: accessToken,
        });
    } else {
      return next(new UnauthorizedError("Invalid user info"));
    }
  } catch (error) {
    return next(new InternalServerError("Failed to login!"));
  }
};
