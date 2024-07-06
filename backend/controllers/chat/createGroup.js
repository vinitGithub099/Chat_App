import { CHAT_LOWER_LIMIT } from "../../configs/constants.js";
import BadRequestError from "../../errors/BadRequestError.js";
import InternalServerError from "../../errors/InternalServerError.js";
import Chat from "../../models/chatModel.js";

/**
 * * status: working
 * @description create a group chat
 * @method POST
 * @endpoint /api/chat/createGroup
 */
export const createGroup = async (req, res, next) => {
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
  if (parsedUsers.length < CHAT_LOWER_LIMIT) {
    return next(
      new BadRequestError(
        "More than two users are required to form a group chat"
      )
    );
  }

  // Add the requesting user to the users array
  parsedUsers.push(req.user._id); // Assuming req.user contains the user object with _id

  try {
    // Create the group chat
    const groupChat = await Chat.create({
      chatName: name,
      users: parsedUsers,
      isGroupChat: true,
      groupAdmin: req.user._id, // Assuming req.user contains the user object with _id
      description: description,
    });

    // Find the full group chat details
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    // Send the response with the full group chat details
    res.status(200).json(fullGroupChat);
  } catch (error) {
    return next(new InternalServerError("Couldn't create the chat"));
  }
};
