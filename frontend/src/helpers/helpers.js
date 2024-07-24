import moment from "moment";

// build the name of chat provided chat and user
export const buildChatName = (chat, user) =>
  chat?.isGroupChat
    ? chat?.chatName
    : chat?.users?.find((member) => member._id !== user?._id)?.name ??
      "Unknown";

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


export const getFormattedDateLabel = (date) => {
  const now = moment();
  const messageDate = moment(date);

  if (messageDate.isSame(now, 'day')) {
    return 'Today';
  } else if (messageDate.isSame(now.subtract(1, 'days'), 'day')) {
    return 'Yesterday';
  } else if (messageDate.isAfter(now.startOf('week'))) {
    return messageDate.format('dddd');
  } else {
    return messageDate.format('DD-MM-YYYY');
  }
};


// group messages by data
export const groupMessagesByDate = (messages) => {
  const messageGroups = messages.reduce((acc, message) => {
    const messageDate = moment(message.updatedAt).format('YYYY-MM-DD');
    if (!acc[messageDate]) {
      acc[messageDate] = [];
    }
    acc[messageDate].push(message);
    return acc;
  }, {});

  const groupedMessages = Object.keys(messageGroups).map((date) => {
    return {
      date,
      messages: messageGroups[date]
    };
  });

  return groupedMessages;
};