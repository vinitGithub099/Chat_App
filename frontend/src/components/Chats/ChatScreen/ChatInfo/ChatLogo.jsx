import { useSelector } from "react-redux";
import userLogo from "../../../../assets/profile-user_64572.png";
import UserAvatar from "../../UserAvatar";
export default function ChatIcon() {
  const currChat = useSelector((state) => state.chat.currentChat);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="m-4 p-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500  rounded-full">
        <UserAvatar
          altText={"hello world"}
          className=""
          imgSrc={userLogo}
          config={"xl"}
        ></UserAvatar>
      </div>
      <h3 className="text-xl text-light-1 py-2 text-center flex-1 font-semibold">
        {currChat ? currChat.chatName : ""}
      </h3>
      {currChat && currChat.users && currChat.users.length > 2 ? (
        <span className="text-light-2">{`${currChat.users.length} Participants`}</span>
      ) : null}
    </div>
  );
}
