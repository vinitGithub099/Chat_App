import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userLogo from "../../../assets/profile-user_64572.png";
import {
  fetchChatMessages,
  fetchChats,
  joinChat,
} from "../../../store/Features/Chat/ChatActions";
import { setCurrentChat } from "../../../store/Features/Chat/ChatSlice";
import ListComponent from "../../ListComponent";
import { getChatName, getShortenedString } from "../../Utils/utils";
import UserAvatar from "../UserAvatar";

export default function DisplayChats({ toggleSideBar }) {
  const chatList = useSelector((state) => state.chat.chats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <ListComponent
      list={chatList}
      className="divide-y divide-light-3 flex-1 mb-2 overflow-y-scroll scrollbar"
      subComponent={ChatCard}
      toggleSideBar={toggleSideBar}
    ></ListComponent>
  );
}

function ChatCard(props) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id);

  const { chatName, latestMessage, toggleSideBar, users } = props;
  const handleClick = (props) => {
    dispatch(setCurrentChat(props));
    dispatch(joinChat());
    dispatch(fetchChatMessages());
    toggleSideBar();
  };

  return (
    <div
      className="px-4 py-1 cursor-pointer hover:bg-dark-1"
      onClick={() => handleClick(props)}
    >
      <div className="flex flex-row items-center gap-4 my-2 rounded-md">
        <UserAvatar
          altText={"hello world"}
          className=""
          imgSrc={userLogo}
          config={"s"}
        ></UserAvatar>
        <div className="flex-1">
          <ChatName
            chatName={chatName}
            users={users}
            userId={userId}
          ></ChatName>
          {latestMessage && (
            <div className="flex flex-row justify-between items-center text-light-2 text-xs">
              <div className="flex">
                <SenderName
                  userId={userId}
                  sender={latestMessage.sender}
                ></SenderName>
                <Message message={latestMessage.content}></Message>
              </div>
              <Timestamp time={latestMessage?.updatedAt}></Timestamp>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatName({ chatName, users, userId }) {
  return (
    <div className="text-light-1 font-semibold">
      {getShortenedString(getChatName(chatName, users, { _id: userId }))}
    </div>
  );
}

function SenderName({ userId, sender }) {
  return (
    <span className="pr-1 font-semibold">
      {userId === sender._id ? `You: ` : `${sender.name}: `}
    </span>
  );
}

function Message({ message }) {
  return <p className="">{getShortenedString(message, 10)}</p>;
}

function Timestamp({ time }) {
  return (
    <span className="pl-1">
      {time ? moment(time).startOf("hour").fromNow() : null}
    </span>
  );
}
