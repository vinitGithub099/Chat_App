import { useEffect } from "react";
import { chatSocket } from "../../main";

const useJoinChatRooms = (chatList, user) => {
  useEffect(() => {
    if (!chatList?.length || !user) return;

    chatList.forEach((chat) => {
      chatSocket.emit("join chat", { user, room: chat });
    });
  }, [chatList, user]);
};

export default useJoinChatRooms;
