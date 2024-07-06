import BadRequestError from "../../errors/BadRequestError.js";
import InternalServerError from "../../errors/InternalServerError.js";
import Chat from "../../models/chatModel.js";
import Message from "../../models/messageModel.js";

/**
 * @description Send message
 * @method POST /api/message/sendMessage
 * @purpose Send a message to a group or individual chat
 */
export const sendMessage = async (req, res, next) => {
  const { content, chatId } = req.body;

  // Validate request data
  if (!content || !chatId) {
    return next(new BadRequestError("Invalid data passed into request!"));
  }

  // Create a new message object
  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    // Create the message in the database
    let message = await Message.create(newMessage);

    // Populate the sender field with name and pic
    message = await message.populate("sender", "name pic").execPopulate();

    // Populate the chat field
    message = await message.populate("chat").execPopulate();

    // Populate the chat.users field with name, pic, and email
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    // Update the chat's latest message
    await Chat.UserfindByIdAndUpdate(chatId, { latestMessage: message });

    // Send the message as the response
    res.json(message);
  } catch (error) {
    // Handle any errors
    return next(new InternalServerError("Couldn't update the Message in DB!"));
  }
};
