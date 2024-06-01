const { GROUP_MEMBERS_LIMIT } = require("../configs/constants");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

/**
 * * status: working
 * @description access to all the chats of a user
 * @method POST /api/chat/accessChat
 * @purpose to establish one-to-one chat 
 */
const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return next(new BadRequestError("UserId param not sent with the request"));
  }

  let chat = null;

  /* find chat if it already exists */
  try {
    chat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
  } catch (error) {
    return next(new InternalServerError("Couldn't access the chat"));
  }

  if (chat?.length > 0) {
    res.send(chat[0]);
    return;
  }

  /* create new chat if it does not exists */
  let chatData = {
    chatName: "sender",
    isGroupChat: false,
    users: [req.user._id, userId],
  };

  try {
    const createdChat = await Chat.create(chatData);
    let fullChat = await Chat.findOne({ _id: createdChat._id }).populate({
      path: "users",
      select: "-password",
    });

    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    res.status(200).json(fullChat);
  } catch (error) {
    return next(new InternalServerError("Failed to create chat!"));
  }
};

/**
 * * status: working
 * @description fetch all the chats
 * @method GET /api/chat/fetchChats
 * @purpose to retrieve all the chats of a user
 */
const fetchChats = async (req, res) => {
  try {
    await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    return next(new InternalServerError("Could not fetch chats!"));
  }
};

/**
 * * status: partial working
 * ! isAdmin param is extra in every user object in response. Also the isAdmin key of admin shows value false both in users and groupAdmin
 * @description create a group
 * @method POST /api/chat/groupChat
 * @purpose to establish a chat group or a chat room between individuals
 */
const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return next(new BadRequestError("Please fill all the fields"));
  }

  let users = JSON.parse(req.body.users);

  if (users.length < GROUP_MEMBERS_LIMIT) {
    return next(
      new BadRequestError(
        "More than two users are required to form a group chat"
      )
    );
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
      description: req.body.description,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    return next(new InternalServerError("Could't create the chat!"));
  }
};

/**
 * * status:  working
 * @description rename a group
 * @method PUT /api/chat/rename
 * @purpose to rename the chat group having chatId a,s sent along with the request, with the specified name
 */
const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;
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

/**
 * * status: working
 * @description add user to a group
 * @method PUT /api/chat/addToGroup
 * @purpose to add a user with userId to chat group/chat room with chatId
 */
const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
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

    if (!added) {
      return next(new NotFoundError("Chat not found!"));
    } else {
      res.json(added);
    }
  } catch (error) {
    return next(new InternalServerError("Coundn't add to the group!"));
  }
};

/**
 * * status: working
 * @description remove user from a group
 * @method POST /api/chat/removeFromGroup
 * @purpose to remove a user with userId from chat group/chat room with chatId
 */
const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;
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

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
