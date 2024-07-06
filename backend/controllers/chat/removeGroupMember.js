import BadRequestError from "../../errors/BadRequestError.js";
import ForbiddenError from "../../errors/ForbiddenError.js";
import InternalServerError from "../../errors/InternalServerError.js";
import NotFoundError from "../../errors/NotFoundError.js";
import Chat from "../../models/chatModel.js";
import User from "../../models/userModel.js";

/**
 * * status: working
 * @description remove user from a group chat
 * @method PUT
 * @endpoint /api/chat/removeGroupMember
 */

export const removeGroupMember = async (req, res, next) => {
  const { chatId, userId } = req.body;
  const reqUserId = req.user._id; // Assuming req.user contains the user object with _id

  // Validate if chatId and userId are present
  if (!chatId || !userId) {
    return next(new BadRequestError("chatId and userId are required"));
  }

  try {
    // Check if the user to be added exists
    const userToAdd = await User.findById(userId);
    if (!userToAdd) {
      return next(new NotFoundError("User not found"));
    }

    // Find the chat to verify it exists and to check if it's a group chat
    const chat = await Chat.findById(chatId);

    // Check if the chat exists
    if (!chat) {
      return next(new NotFoundError("Chat not found"));
    }

    // Check if the chat is a group chat
    if (!chat.isGroupChat) {
      return next(
        new BadRequestError("Only group chats can have members removed")
      );
    }

    // Check if the user is the group admin
    if (chat.groupAdmin.toString() !== reqUserId.toString()) {
      return next(
        new ForbiddenError(
          "Only the group admin can remove members from the group"
        )
      );
    }

    // Check if the user is a member
    if (!chat.users.includes(userId)) {
      return next(new BadRequestError("User is not a member of the group"));
    }

    // Remove the user from the chat's users array
    const updatedChat = await Chat.findByIdAndUpdate(
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

    // Check if the chat was found and updated
    if (!updatedChat) {
      return next(new NotFoundError("Chat not found"));
    }

    // Respond with the updated chat document
    res.json(updatedChat);
  } catch (error) {
    // Handle internal server errors
    return next(
      new InternalServerError("Couldn't remove member from the group")
    );
  }
};
