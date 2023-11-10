export const getShortenedString = (str, limit = 20) => {
  let modifiedStr = str;
  if (modifiedStr.length > limit) {
    modifiedStr = str.substring(0, limit) + "...";
  }
  return modifiedStr;
};

export const getChatName = (chatName, users, currUser) => {
  let newChatName = chatName;
  if (chatName === "sender") {
    const sender = users.find((user) => user._id !== currUser._id);
    newChatName = sender.name;
  }

  return newChatName;
};
