import { useState } from "react";
import userLogo from "../../assets/profile-user_64572.png";
import UserAvatar from "./UserAvatar";
export default function MessageCard({
  className,
  senderName,
  timeStamp,
  message,
}) {
  const getTimeFromDate = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString();

  return (
    <div
      className={`min-w-msgMinWidth max-w-msgMaxWidth p-2 grid grid-cols-10 ${className}`}
    >
      {
        <UserAvatar
          className="col-span-1 pr-1"
          config="xs"
          imgSrc={userLogo}
        ></UserAvatar>
      }
      <div className="col-span-9 flex flex-row justify-between">
        <div className="mb-2 flex flex-col items-baseline justify-between">
          <h6 className="text-xs mb-1 sm:text-sm font-semibold">
            {senderName ? senderName : "Sender Name"}
          </h6>
          <MessageText message={message}></MessageText>
        </div>
        <p className="text-xs">
          {timeStamp ? getTimeFromDate(timeStamp) : "time"}
        </p>
      </div>
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
      <>
        {modifiedMsg}
        <span
          className="hover:cursor-pointer text-blue-500"
          onClick={toggleMessageWrapper}
        >
          Read More...
        </span>
      </>
    );
  };

  return (
    <div className="text-xs sm:text-sm">
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
