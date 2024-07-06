import InternalServerError from "../../errors/InternalServerError.js";
import Message from "../../models/messageModel.js";

/**
 * @description fetch all the messages of a chat
 * @method POST
 * @endpoint /api/message/messages/:chatId
 */
export const fetchChatMessages = async (req, res, next) => {
  try {
    // Find all messages for the given chatId
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    // Send the messages as a JSON response
    res.json(messages);
  } catch (error) {
    // Handle errors during message retrieval
    return next(new InternalServerError("Couldn't fetch the messages!"));
  }
};
