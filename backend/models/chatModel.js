import { Schema, model } from "mongoose";

const chatModel = Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    description: { type: String, default: "This is group description" },
    /**
     * * each object will be a reference to the User Model */
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    /**
     * * object will be a reference to the object of Message Model */
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    /**
     * * object will be a reference to the User Model */
    groupAdmin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = model("Chat", chatModel);
export default Chat;
