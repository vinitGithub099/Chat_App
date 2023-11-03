import { FiSearch } from "react-icons/fi";
import Form from "../../Form/Form";
import SearchChatResults from "./SearchChatResults";

export default function SearchChat() {
  return (
    <div className="w-full flex flex-1 flex-col overflow-hidden">
      <SearchBar></SearchBar>
      <SearchChatResults></SearchChatResults>
    </div>
  );
}

function SearchBar() {
  return (
    <Form
      className="my-4 "
      fields={searchFormFields}
      handleSubmit={(e) => console.log(e)}
    ></Form>
  );
}

/* function SearchChatResults() {
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chat.chats);
  const userId = useSelector((state) => state.auth.user._id);
  const handleClick = (props) => {
    dispatch(setCurrentChat(props))
  };
  function SubComponent(props) {
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
  return (
    <ListComponent
      list={chatList}
      className="mb-2 overflow-y-scroll scrollbar"
      subComponent={SubComponent}
    ></ListComponent>
  );
}
 */
const searchFormFields = [
  {
    type: "text",
    label: "",
    name: "searchChat",
    id: "searchChat",
    defaultValue: "",
    containerClassName: "py-2 rounded-md bg-light-3",
    className: "rounded-md bg-light-3",
    inputClassName: "w-full outline-none bg-light-3 text-light-1",
    placeholder: "Search @chat",
    required: true,
    icon: { icon: FiSearch, size: 20, className: "p-2 text-gray-500" },
    onChange: (e) => console.log(e.target.value),
  },
];

/* const names = [
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
];
 */
