import BadRequestError from "../../errors/BadRequestError.js";
import InternalServerError from "../../errors/InternalServerError.js";
import NotFoundError from "../../errors/NotFoundError.js";
import Chat from "../../models/chatModel.js";

/**
 * * status: working
 * @description add user to a group
 * @method PUT /api/chat/addGroupMember
 * @purpose to add a user with userId to chat group/chat room with chatId
 */
export const addGroupMember = async (req, res, next) => {
  const { chatId, userId } = req.body;

  // Validate if chatId and userId are present
  if (!chatId || !userId) {
    return next(new BadRequestError("chatId and userId are required"));
  }

  try {
    // Add the user to the chat's users array
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    // Check if the chat was found and updated
    if (!added) {
      return next(new NotFoundError("Chat not found!"));
    }

    // Respond with the updated chat document
    res.json(added);
  } catch (error) {
    // Handle internal server errors
    return next(new InternalServerError("Couldn't add to the group!"));
  }
};
