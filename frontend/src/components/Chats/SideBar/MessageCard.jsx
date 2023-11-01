import { useState } from "react";
import { useSelector } from "react-redux";
import userLogo from "../../../assets/profile-user_64572.png";
import UserAvatar from "../UserAvatar";

export default function MessageCard({ senderName, timeStamp, message }) {
  const userName = useSelector((state) => state.auth.name);

  const buildMessageClassName = (senderName) => {
    let defaultClassName =
      "my-4 rounded-md max-w-[90%] flex flex-row items-start gap-4 ";
    if (userName == senderName) defaultClassName += "self-end";
    else defaultClassName += "self-start";
    return defaultClassName;
  };

  return (
    <div className={buildMessageClassName(senderName)}>
      <SenderAvatar senderName={senderName}></SenderAvatar>
      <ChatDetail
        senderName={senderName}
        message={message}
        timeStamp={timeStamp}
      ></ChatDetail>
    </div>
  );
}

function SenderAvatar({ senderName }) {
  const userName = useSelector((state) => state.auth.name);

  return (
    senderName != userName && (
      <UserAvatar
        className="border-2"
        config="m"
        imgSrc={userLogo}
      ></UserAvatar>
    )
  );
}

function ChatDetail({ senderName, message, timeStamp }) {
  const userName = useSelector((state) => state.auth.name);
  const getSenderName = (senderName) => {
    /**
     * handle error here
     *  if (_.isEmpty(senderName)) throw new Error();
     * */
    if (senderName != userName) return senderName;
    return "You";
  };

  const buildClassName = (senderName) => {
    let defaultClassName = "w-full flex flex-col bg-light-3 p-2 rounded-md ";
    const decoratorClassName =
      "relative after:absolute after:content-[''] after:w-3 after:h-3 after:bg-light-3 after:rotate-45 after: after:top-1 ";

    defaultClassName += decoratorClassName;

    if (senderName != userName) defaultClassName += "after:-left-1";
    else defaultClassName += "after:-right-1";

    return defaultClassName;
  };
  return (
    <div className={buildClassName(senderName)}>
      <div className="flex flex-row items-baseline justify-between gap-4">
        <h6 className="text-sm mb-1 sm:text-md font-semibold text-light-2">
          {getSenderName(senderName)}
        </h6>
        <MessageDeliveryTime timeStamp={timeStamp}></MessageDeliveryTime>
      </div>
      <MessageText message={message}></MessageText>
    </div>
  );
}

function MessageText({ message }) {
  const [compressMessage, setCompressMessage] = useState(
    message && message.length > 200
  );
  const toggleMessageWrapper = () => setCompressMessage((prev) => !prev);

  const MessageWrapper = () => {
    let modifiedMsg = message.substring(0, 200);
    return (
      <p className="text-light-1">
        {modifiedMsg}
        <span
          className="hover:cursor-pointer text-blue-500"
          onClick={toggleMessageWrapper}
        >
          Read More...
        </span>
      </p>
    );
  };

  return (
    <div className="text-sm sm:text-md text-light-1">
      {message ? (
        compressMessage ? (
          <MessageWrapper></MessageWrapper>
        ) : (
          message
        )
      ) : (
        <span className="italic">This is a was deleted or not fetched!</span>
      )}
    </div>
  );
}

function MessageDeliveryTime({ timeStamp }) {
  return (
    <p className="text-xs text-light-2">
      {timeStamp ? formatTimestampToText(timeStamp) : "time"}
    </p>
  );
}

function formatTimestampToText(timestamp) {
  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Get the current date for comparison
  const currentDate = new Date();

  // Check if it's today
  if (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `Today at ${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  }
  // Check if it's yesterday
  else if (
    date.getDate() === currentDate.getDate() - 1 &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `Yesterday at ${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  }
  // For other days, display the full date and time
  else {
    return `${date.toLocaleDateString()} at ${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }
}
