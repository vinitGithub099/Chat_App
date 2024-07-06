import BadRequestError from "../../errors/BadRequestError.js";
import InternalServerError from "../../errors/InternalServerError.js";
import NotFoundError from "../../errors/NotFoundError.js";
import Chat from "../../models/chatModel.js";

/**
 * * status: working
 * @description remove user from a chat
 * @method PUT /api/chat/removeChatMember
 * @purpose to remove a user from a chat
 */
export const removeChatMember = async (req, res, next) => {
  const { chatId, userId } = req.body;

  // Validate if chatId and userId are present
  if (!chatId || !userId) {
    return next(new BadRequestError("chatId and userId are required"));
  }

  try {
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      return next(new NotFoundError("Chat not found"));
    }

    res.json(removed);
  } catch (error) {
    return next(
      new InternalServerError(
        "An error occurred while removing the user from the group."
      )
    );
  }
};
