import BadRequestError from "../../errors/BadRequestError.js";
import InternalServerError from "../../errors/InternalServerError.js";
import NotFoundError from "../../errors/NotFoundError.js";
import Chat from "../../models/chatModel.js";

/**
 * * status:  working
 * @description rename a group
 * @method PUT /api/chat/rename
 * @purpose to rename the chat
 */
export const renameChat = async (req, res, next) => {
  const { chatId, chatName } = req.body;

  // Validate if chatId and userId are present
  if (!chatId || !chatName)
    return next(new BadRequestError("chatId and chatName are required"));

  try {
    const updateChat = await Chat.findByIdAndUpdate(
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

    if (!updateChat) {
      return next(new NotFoundError("Chat not found"));
    }
    res.json(updateChat);
  } catch (error) {
    return next(new InternalServerError("Could not rename the group!"));
  }
};
