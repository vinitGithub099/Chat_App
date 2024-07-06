import BadRequestError from "../../errors/BadRequestError.js";
import ConflictError from "../../errors/ConflictError.js";
import InternalServerError from "../../errors/InternalServerError.js";
import User from "../../models/userModel.js";

/**
 * * status: working
 * @description Register user
 * @method POST /api/user/register
 * @purpose to register user into the database/app
 */
export const registerUser = async (req, res, next) => {
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
