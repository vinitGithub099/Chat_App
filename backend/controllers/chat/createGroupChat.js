import { GROUP_MEMBERS_LIMIT } from "../../configs/constants.js";
import BadRequestError from "../../errors/BadRequestError.js";
import InternalServerError from "../../errors/InternalServerError.js";
import Chat from "../../models/chatModel.js";

/**
 * * status: partial working
 * ! isAdmin param is extra in every user object in response. Also the isAdmin key of admin shows value false both in users and groupAdmin
 * @description create a group
 * @method POST /api/chat/createGroupChat
 * @purpose to establish a chat group or a chat room between individuals
 */
export const createGroupChat = async (req, res, next) => {
  const { users, name, description } = req.body;

  // Check if users and name are provided
  if (!users || !name) {
    return next(new BadRequestError("Please fill all the fields"));
  }

  let parsedUsers;

  // Parse the users array
  try {
    parsedUsers = JSON.parse(users);
  } catch (error) {
    return next(new BadRequestError("Invalid users format"));
  }

  // Ensure there are enough users to form a group chat
  if (parsedUsers.length < GROUP_MEMBERS_LIMIT) {
    return next(
      new BadRequestError(
        "More than two users are required to form a group chat"
      )
    );
  }

  // Add the requesting user to the users array
  parsedUsers.push(req.user);

  try {
    // Create the group chat
    const groupChat = await Chat.create({
      chatName: name,
      users: parsedUsers,
      isGroupChat: true,
      groupAdmin: req.user,
      description: description,
    });

    // Find the full group chat details
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    // Send the response with the full group chat details
    res.status(200).json(fullGroupChat);
  } catch (error) {
    return next(new InternalServerError("Couldn't create the chat!"));
  }
};
