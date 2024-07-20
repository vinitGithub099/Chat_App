// build the name of chat provided chat and user
export const buildChatName = (chat, user) =>
  chat?.isGroupChat
    ? chat?.chatName
    : chat?.users?.find((member) => member._id !== user?._id)?.name ??
      "Unknown";

// format timestamp in hh:mm format
export const formatTimestamp = (timestamp) => {
  if (!timestamp) {
    return "";
  }

  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    return "";
  }

  return date.toTimeString().slice(0, 5);
};

// generate unique color from _id (ObjectId)
export const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, "0");
  }
  return color;
};
