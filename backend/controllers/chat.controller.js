const { GROUP_MEMBERS_LIMIT } = require("../configs/constants");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

/**
 * * status: working
 * @description access to all the chats of a user
 * @method POST /api/chat/accessChat
 * @purpose to establish chat connection between individuals
 */
const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with the request");
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "password"
      );

      res.status(200).json(fullChat);
    } catch (error) {
      throw new Error(error);
    }
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
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
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
    // res.status(400).send({ message: "could not fetch chats" });
    throw new Error(error.message);
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
    return res.status(400).send({ message: "Please fill all the fields" });
  }

  let users = JSON.parse(req.body.users);

  if (users.length < GROUP_MEMBERS_LIMIT) {
    return res
      .status(400)
      .send("More than two users are required to form a group chat");
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
    res.status(400);
    throw new Error(error);
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
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(updateChat);
  }
};

/**
 * * status: working
 * @description add user to a group
 * @method POST /api/chat/addToGroup
 * @purpose to add a user with userId to chat group/chat room with chatId
 */
const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

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
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(added);
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
      res.status(404).json({ error: "Chat not found" });
    } else {
      res.json(removed);
    }
  } catch (error) {
    // Handle any database or other errors here
    res.status(500).json({
      error: "An error occurred while removing the user from the group.",
    });
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

// {"_id":"6505f1bec471484717b8b3c3","name":"Sample User 1","email":"sample1@gmail.com","password":"$2b$10$QxSGcOKQmu3FBs1D69m1qOIXZw1dqiMGC1aypUOe/btsdhDK2jWue","isAdmin":false,"createdAt":"2023-09-16T18:19:42.756Z","updatedAt":"2023-09-16T18:19:42.756Z","__v":0,"inputClassName":"p-2 w-full rounded-md outline-none bg-light-3 text-light-1"},{"_id":"6505f22bc471484717b8b3c6","name":"Sample User 2","email":"sample2@gmail.com","password":"$2b$10$nIkoqA1s4zqj57YCrbd7HeVo/sO8wQJn9573OCTJVsAyK4RrbzzmC","isAdmin":false,"createdAt":"2023-09-16T18:21:31.088Z","updatedAt":"2023-09-16T18:21:31.088Z","__v":0,"inputClassName":"p-2 w-full rounded-md outline-none bg-light-3 text-light-1"},{"_id":"6505f2e0c471484717b8b3c9","name":"Sample User 3","email":"sample3@gmail.com","password":"$2b$10$jY0718c1q3vk04oqMCaLU.KSS5x1XpGAlCn9YLrlMuk8zFGoCXfra","isAdmin":false,"createdAt":"2023-09-16T18:24:32.423Z","updatedAt":"2023-09-16T18:24:32.423Z","__v":0,"inputClassName":"p-2 w-full rounded-md outline-none bg-light-3 text-light-1"}
