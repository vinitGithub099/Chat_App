const User = require("../models/userModel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../configs/generateToken");

/**
 * * status: working
 * @description Register user
 * @method POST /api/user/register
 * @purpose to register user into the database/app
 */
const registerUser = async (req, res) => {
  const { name, email, password, pic, bio, phone, isAdmin } = req.body;

  if (!name && !email && !password) {
    res.status(400).send("Please Enter all the fields");
    // throw new Error("Please Enter all the fields");
    return;
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send("User already exists");
    // throw new Error("User already exists");
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    bio,
    pic,
    isAdmin,
  });

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      bio: user.bio,
      pic: user.pic,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Failed to create the User");
    // throw new Error("Failed to create the User");
  }
};

/**
 * * status: working
 * @description Login user
 * @method POST /api/user/login
 * @purpose to login a previously registered user into the database/app
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.matchPassword(password)) {
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
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        bio: user.bio,
        pic: user.pic,
        isAdmin: user.isAdmin,
        accessToken: accessToken,
      });
  } else {
    res.status(401).send("Invalid Email or Password");
    // throw new Error("Invalid Email or Password");
  }
};

/**
 * * status: working
 * @description Get all users
 * @method GET /api/user/allUsers
 * @purpose to get the data of all the users
 */
const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
};

/**
 * * status: working
 * @description Refresh Token
 * @method GET /api/user/refresh-token
 * @purpose to renew the access token and refresh token if access token expires or is not received in the headers of request
 */
const refreshToken = async (req, res) => {
  const cookieRefreshToken = req.refreshToken;
  const { id } = jwt.verify(cookieRefreshToken, process.env.JWT_SECRET);

  const accessToken = generateAccessToken(id);
  const refreshToken = generateRefreshToken(id);

  res
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      expire: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({
      accessToken: accessToken,
    });
};

module.exports = { loginUser, registerUser, allUsers, refreshToken };
