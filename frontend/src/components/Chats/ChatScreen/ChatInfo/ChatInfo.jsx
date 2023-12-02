import { useSelector } from "react-redux";
import AddUserForm from "./AddUserForm";
import ChatDescription from "./ChatDescription";
import ChatIcon from "./ChatLogo";
import ChatMembers from "./ChatMembers";

export default function ChatInfo() {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="">
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
  );
}
