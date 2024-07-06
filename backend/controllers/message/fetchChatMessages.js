import InternalServerError from "../../errors/InternalServerError.js";
import Message from "../../models/messageModel.js";

/**
 * @description Access to all messages of a chatId
 * @method POST /api/message/messages/:chatId
 * @purpose Retrieve all messages of user from chat specified by chatId in the URL params
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
