import { Schema, model } from "mongoose";

const messageModel = Schema(
  {
    /**
     * * object wil reference to the object of User Model
     * * contains the information related to the sender*/
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    /**
     * * content of the message i.e actual message */
    content: { type: String, trim: true },
    /**
     * * object will reference to the object of the Chat Model
     * * contains the information related to the chat
     *  */
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

const Message = model("Message", messageModel);

export default Message;
