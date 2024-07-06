import BadRequestError from "../../errors/BadRequestError.js";
import ForbiddenError from "../../errors/ForbiddenError.js";
import InternalServerError from "../../errors/InternalServerError.js";
import NotFoundError from "../../errors/NotFoundError.js";
import Chat from "../../models/chatModel.js";

/**
 * * status:  working
 * @description rename a group chat
 * @method PUT
 * @endpoint /api/chat/renameGroup
 */
export const renameGroup = async (req, res, next) => {
  const { chatId, chatName } = req.body;
  const userId = req.user._id; // Assuming userId is available in req.user.id

  // Validate if chatId and chatName are present
  if (!chatId || !chatName) {
    return next(new BadRequestError("chatId and chatName are required"));
  }

  try {
    // Find the chat to verify it exists and to check if it's a group chat
    const chat = await Chat.findById(chatId);

    // Check if the chat exists
    if (!chat) {
      return next(new NotFoundError("Chat not found"));
    }

    // Check if the chat is a group chat
    if (!chat.isGroupChat) {
      return next(new BadRequestError("Only group chats can be renamed."));
    }

    // Check if the user is the group admin
    if (chat.groupAdmin.toString() !== userId.toString()) {
      return next(
        new ForbiddenError("Only the group admin can rename the group")
      );
    }

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.json(updatedChat);
  } catch (error) {
    // Handle internal server errors
    return next(new InternalServerError("Could not rename the group!"));
  }
};
