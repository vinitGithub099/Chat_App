import ChatScreen from "../components/Chats/ChatScreen";
import SideBar from "../components/Chats/SideBar";

export default function ChatsPage({ className }) {
  return (
    <div className={`w-full max-h-screen flex flex-row ${className}`}>
      <SideBar className=""></SideBar>
      <ChatScreen className=""></ChatScreen>
    </div>
  );
}
