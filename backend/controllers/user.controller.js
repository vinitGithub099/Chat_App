const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const BadRequestError = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");
const InternalServerError = require("../errors/InternalServerError");
const UnauthorizedError = require("../errors/UnauthorizedError");

/**
 * * status: working
 * @description Register user
 * @method POST /api/user/register
 * @purpose to register user into the database/app
 */
const registerUser = async (req, res) => {
  const { name, email, password, pic, bio, phone, isAdmin } = req.body;

  if (!name || !email || !password) {
    return next(new BadRequestError("Fields are missing!"));
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new ConflictError("User already Exists!"));
    }

    await User.create({
      name,
      email,
      password,
      phone,
      bio,
      pic,
      isAdmin,
    });

    res.status(201).json();
  } catch (error) {
    return next(new InternalServerError("Failed to create user!"));
  }
};

/**
 * * status: working
 * @description Login user
 * @method POST /api/user/login
 * @purpose to login a previously registered user into the database/app
 */
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Fields are missing!"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new NotFoundError("User doesn't exists!"));
    }

    const isPswdMatched = await user.matchPassword(password);

    if (isPswdMatched) {
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      res
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
          expire: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
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
    console.log(error.toString());
    return next(new InternalServerError("Failed to login!"));
  }
};

/**
 * * status: working
 * @description Get all users
 * @method GET /api/user/allUsers
 * @purpose to get the data of all the users
 */
const allUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    if (!req.user || !req.user._id) {
      return next(new BadRequestError("user info missing from request!"));
    }

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

    res.send(users);
  } catch (error) {
    return next(new InternalServerError("Failed to fetch users!"));
  }
};

/**
 * * status: working
 * @description Refresh Token
 * @method GET /api/user/refresh-token
 * @purpose to renew the access token and refresh token if access token expires or is not received in the headers of request
 */
const refreshToken = async (req, res, next) => {
  const cookieRefreshToken = req.refreshToken;

  if (!cookieRefreshToken) {
    return next(new BadRequestError("Refresh not found in request!"));
  }

  try {
    const { id } = jwt.verify(cookieRefreshToken, process.env.JWT_SECRET);
    const accessToken = generateAccessToken(id);
    const newRefreshToken = generateRefreshToken(id);

    res
      .cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        expire: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        accessToken: accessToken,
      });
  } catch (error) {
    return next(new InternalServerError("Failed to get refresh token!"));
  }
};

/**
 * * status: working
 * @description fetch user details if token is availble
 * @method GET /api/user/auto-login
 * @purpose to auto login the user if token is valid
 */
const logout = async (req, res) => {
  res.clearCookie("refresh_token");
  res.redirect("/");
  res.status(200).json({
    message: "logout",
  });
};

module.exports = {
  loginUser,
  registerUser,
  allUsers,
  refreshToken,
  logout,
};
