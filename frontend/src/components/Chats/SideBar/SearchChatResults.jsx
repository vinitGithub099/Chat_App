import { useDispatch, useSelector } from "react-redux";
import userLogo from "../../../assets/profile-user_64572.png";
import { setCurrentChat } from "../../../store/Features/Chat/ChatSlice";
import ListComponent from "../../ListComponent";
import UserAvatar from "../UserAvatar";
import { formatTimestampToText } from "../Utils/formatTimestampToText";

export default function SearchChatResults() {
  const chatList = useSelector((state) => state.chat.chats);

  return (
    <ListComponent
      list={chatList}
      className="mb-2 overflow-y-scroll scrollbar"
      subComponent={SubComponent}
    ></ListComponent>
  );
}

function SubComponent(props) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id);
  const handleClick = (props) => dispatch(setCurrentChat(props));

  const { chatName, latestMessage } = props;

  return (
    <div className="p-2 cursor-pointer" onClick={() => handleClick(props)}>
      <div className="flex flex-row items-center gap-4 my-2 rounded-md">
        <UserAvatar
          altText={"hello world"}
          className=""
          imgSrc={userLogo}
          config={"s"}
        ></UserAvatar>
        <p className="text text-light-2 font-bold">{chatName}</p>
      </div>
      <div className="flex flex-row justify-end items-center italic text-light-2 text-xs">
        <span className="pr-1">
          {userId === latestMessage.sender._id
            ? `You: `
            : `${latestMessage.sender.name}: `}
        </span>
        <p>{latestMessage.content}</p>
        <span className="pl-1">
          {latestMessage?.updatedAt &&
            formatTimestampToText(latestMessage?.updatedAt)}
        </span>
      </div>
    </div>
  );
}
