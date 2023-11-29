import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import Button from "../../../Form/Button";
import AddUserForm from "./AddUserForm";
import ChatDescription from "./ChatDescription";
import ChatIcon from "./ChatLogo";
import ChatMembers from "./ChatMembers";

export default function ChatInfo({ handleChannelExtras, className }) {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const user = useSelector((state) => state.auth.user);
  return (
    <div
      className={`w-full sm:w-1/2 h-screen bg-dark-3 fixed right-0 flex flex-col rounded-tl-lg rounded-bl-lg overflow-y-scroll scrollbar pb-10 ${className}`}
    >
      <div className="p-4 text-light-1 flex flex-row items-center border-b border-light-3">
        <Button
          className="p-1 rounded-full cursor-pointer hover:bg-light-3 hover:bg-opacity-60"
          handleClick={() => handleChannelExtras(null)}
        >
          <BiArrowBack size={20}></BiArrowBack>
        </Button>
      </div>
      <div className="flex-1 sm:px-4">
        <ChatIcon></ChatIcon>
        <ChatDescription></ChatDescription>
        <ChatMembers></ChatMembers>
        {currentChat &&
        user &&
        currentChat.groupAdmin &&
        currentChat.isGroupChat &&
        currentChat.groupAdmin._id === user._id ? (
          <AddUserForm></AddUserForm>
        ) : null}
      </div>
    </div>
  );
}
