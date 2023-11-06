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
      className="flex-1 mb-2 overflow-y-scroll scrollbar"
      subComponent={ListItem}
    ></ListComponent>
  );
}

function ListItem(props) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id);
  const handleClick = (props) => {
    dispatch(setCurrentChat(props));
  };

  const { chatName, latestMessage } = props;

  const getShortenedString = (str) => {
    let modifiedStr = str;
    if (str.length > 20) {
      modifiedStr = str.substring(0, 20) + "...";
    }
    return modifiedStr;
  };

  return (
    <div
      className="shadow-sm shadow-light-3 p-1 cursor-pointer"
      onClick={() => handleClick(props)}
    >
      <div className="flex flex-row items-center gap-4 my-2 rounded-md">
        <UserAvatar
          altText={"hello world"}
          className=""
          imgSrc={userLogo}
          config={"m"}
        ></UserAvatar>
        <div className="flex-1">
          <p className="text-light-1 font-semibold">
            {getShortenedString(chatName)}
          </p>
          {latestMessage && (
            <div className="flex flex-row justify-between items-center text-light-2 text-xs">
              <span className="flex">
                <span className="pr-1">
                  {userId === latestMessage.sender._id
                    ? `You: `
                    : `${latestMessage.sender.name}: `}
                </span>
                <p>{latestMessage.content}</p>
              </span>
              <span className="pl-1">
                {latestMessage?.updatedAt
                  ? formatTimestampToText(latestMessage?.updatedAt)
                  : "time"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

