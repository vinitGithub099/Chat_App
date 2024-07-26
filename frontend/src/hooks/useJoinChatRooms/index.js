import { useEffect } from "react";
import { chatSocket } from "../../main";

const useJoinChatRooms = (chatList, user) => {
  useEffect(() => {
    const chats = Object.values(chatList);
    if (!chats?.length || !user) return;

    chats.forEach((chat) => {
      chatSocket.emit("join chat", { user, room: chat });
    });
  }, [chatList, user]);
};

export default useJoinChatRooms;
