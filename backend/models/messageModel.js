const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    /**
     * * object wil reference to the object of User Model
     * * contains the information related to the sender*/
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    /**
     * * content of the message i.e actual message */
    content: { type: String, trim: true },
    /**
     * * object will reference to the object of the Chat Model
     * * contains the information related to the chat
     *  */
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageModel);

module.exports = Message;
