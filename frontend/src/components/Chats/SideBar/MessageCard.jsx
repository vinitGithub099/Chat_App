import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import userLogo from "../../../assets/profile-user_64572.png";
import UserAvatar from "../UserAvatar";

export default function MessageCard(props) {
  const user = useSelector((state) => state.auth.user);
  const senderName = props.sender.name;
  const message = props.content;
  const timeStamp = props.updatedAt;

  const buildMessageClassName = (senderName) => {
    let defaultClassName =
      "my-4 rounded-md max-w-[90%] flex flex-row items-start gap-4 ";
    if (user.name == senderName) defaultClassName += "self-end";
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
  const user = useSelector((state) => state.auth.user);

  return (
    senderName != user.name && (
      <UserAvatar
        className="border-2"
        config="m"
        imgSrc={userLogo}
      ></UserAvatar>
    )
  );
}

function ChatDetail({ senderName, message, timeStamp }) {
  const user = useSelector((state) => state.auth.user);
  const getSenderName = (senderName) => {
    if (senderName != user.name) return senderName;
    return "You";
  };

  const buildClassName = (senderName) => {
    let defaultClassName = "w-full flex flex-col bg-light-3 p-2 rounded-md ";
    const decoratorClassName =
      "relative after:absolute after:content-[''] after:w-3 after:h-3 after:bg-light-3 after:rotate-45 after: after:top-1 ";

    defaultClassName += decoratorClassName;

    if (senderName != user.name) defaultClassName += "after:-left-1";
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
        <span className="italic">
          This is message was deleted or not fetched!
        </span>
      )}
    </div>
  );
}

function MessageDeliveryTime({ timeStamp }) {
  return (
    <p className="text-xs text-light-2">
      {timeStamp ? moment(timeStamp).calendar() : null}
    </p>
  );
}
