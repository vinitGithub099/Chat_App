const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    /**
     * * each object will be a reference to the User Model */
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    /**
     * * object will be a reference to the object of Message Model */
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    /**
     * * object will be a reference to the User Model */
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timeStamps: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;
