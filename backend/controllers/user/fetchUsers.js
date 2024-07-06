import BadRequestError from "../../errors/BadRequestError.js";
import InternalServerError from "../../errors/InternalServerError.js";
import User from "../../models/userModel.js";

/**
 * * status: working
 * @description fetch all users
 * @method GET
 * @endpoint /api/user/fetchUsers
 */
export const fetchUsers = async (req, res, next) => {
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
