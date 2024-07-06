import BadRequestError from "../../errors/BadRequestError.js";
import InternalServerError from "../../errors/InternalServerError.js";
import Chat from "../../models/chatModel.js";
import User from "../../models/userModel.js";

/**
 * @description Access or create a one-to-one chat between two users
 * @method POST 
 * @endpoint /api/chat/accessChat
 */
export const accessChat = async (req, res, next) => {
  const { userId } = req.body;

  // Validate if userId is present
  if (!userId) {
    return next(new BadRequestError("UserId param not sent with the request"));
  }

  try {
    // Find existing chat between current user and userId
    let chat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    // Populate sender details for latestMessage
    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    // If chat exists, return the first one found
    if (chat.length > 0) {
      return res.status(200).send(chat[0]);
    }

    // Create new chat if no existing chat is found
    const chatData = {
      chatName: "sender", // Adjust as per your naming convention
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    // Create the new chat
    const createdChat = await Chat.create(chatData);

    // Fetch full details of the newly created chat
    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate({
      path: "users",
      select: "-password",
    });

    // Return the full chat details
    res.status(200).json(fullChat);
  } catch (error) {
    // Handle errors during chat find or create
    return next(new InternalServerError("Failed to access or create chat"));
  }
};
