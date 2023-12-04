const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

/**
 * * status: working
 * @description send message
 * @method POST /api/message/sendMessage
 * @purpose to send message to a group or individual
 */
const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    /* console.log("Invalid data passed into request"); */
    return res.sendStatus(400);
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

/**
 * * status: working
 * @description access to all messages of a chatId
 * @method POST /api/message/messages/:chatId
 * @purpose to retrieve all messages of user with from chat specified by chatId in the url params
 */
const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

module.exports = { sendMessage, allMessages };
