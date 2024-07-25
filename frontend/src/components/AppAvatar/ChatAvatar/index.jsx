import { Avatar } from "@material-tailwind/react";
import { useMemo } from "react";
import { FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { buildChatName, stringToColor } from "../../../helpers/helpers";

const ChatAvatar = ({ chat, className }) => {
  const randomColor = useMemo(() => stringToColor(chat._id), [chat._id]);
  const user = useSelector((state) => state.auth.user);
  const chatName = buildChatName(chat, user);

  const renderInitialAvatar = (initials) => (
    <div className={className} style={{ backgroundColor: randomColor }}>
      <span>{initials}</span>
    </div>
  );

  if (chat?.imageSrc) {
    return <Avatar src={chat.imageSrc} className={className} />;
  } else if (chat?.isGroupChat) {
    return (
      <div className={className} style={{ backgroundColor: randomColor }}>
        <FaUsers />
      </div>
    );
  } else {
    const initials = chatName.charAt(0).toUpperCase();
    return renderInitialAvatar(initials);
  }
};

export default ChatAvatar;
