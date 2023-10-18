import { useState } from "react";
import { useSelector } from "react-redux";
import userLogo from "../../assets/profile-user_64572.png";
import UserAvatar from "./UserAvatar";

export default function MessageCard({
  className,
  senderName,
  timeStamp,
  message,
}) {
  return (
    <div
      className={`min-w-msgMinWidth max-w-msgMaxWidth p-2 grid grid-cols-10 ${className}`}
    >
      <SenderAvatar senderName={senderName}></SenderAvatar>
      <div className="col-span-9 flex flex-row justify-between">
        <ChatDetail senderName={senderName} message={message}></ChatDetail>
        <MessageDeliveryTime timeStamp={timeStamp}></MessageDeliveryTime>
      </div>
    </div>
  );
}

function SenderAvatar({ senderName }) {
  const userName = useSelector((state) => state.auth.name);

  return (
    senderName != userName && (
      <UserAvatar
        className="col-span-1 pr-1"
        config="xs"
        imgSrc={userLogo}
      ></UserAvatar>
    )
  );
}

function ChatDetail({ senderName, message }) {
  const userName = useSelector((state) => state.auth.name);

  return (
    <div className="mb-2 flex flex-col items-baseline justify-between">
      {senderName != userName && (
        <h6 className="text-xs mb-1 sm:text-sm font-semibold">
          {senderName ? senderName : "Sender Name"}
        </h6>
      )}
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

function MessageDeliveryTime({ timeStamp }) {
  const getTimeFromDate = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString();
  return (
    <p className="text-xs">{timeStamp ? getTimeFromDate(timeStamp) : "time"}</p>
  );
}
