import InternalServerError from "../../errors/InternalServerError.js";
import Chat from "../../models/chatModel.js";
import User from "../../models/userModel.js";

/**
 * * status: working
 * @description fetch all the chats
 * @method GET
 * @endpoint /api/chat/fetchChats
 */
export const fetchChats = async (req, res, next) => {
  try {
    let chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    chats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    res.status(200).send(chats);
  } catch (error) {
    return next(new InternalServerError("Could not fetch chats!"));
  }
};
