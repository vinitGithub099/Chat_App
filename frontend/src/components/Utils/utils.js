export const getShortenedString = (str) => {
  let modifiedStr = str;
  if (modifiedStr.length > 15) {
    modifiedStr = str.substring(0, 15) + "...";
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
