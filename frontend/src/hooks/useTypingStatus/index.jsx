import { useEffect, useState } from "react";
import { chatSocket } from "../../main";


const useTypingStatus = (chatId) => {
  const [typingStatus, updateTypingStatus] = useState({
    isTyping: false,
    name: null,
  });

  useEffect(() => {
    const handleStartTyping = ({ room, user }) => {
      if (room?._id === chatId) {
        updateTypingStatus({ isTyping: true, name: user?.name });
      }
    };

    const handleStopTyping = ({ room }) => {
      if (room?._id === chatId) {
        updateTypingStatus({ isTyping: false, name: null });
      }
    };

    chatSocket.on("typing", handleStartTyping);
    chatSocket.on("stop typing", handleStopTyping);

    return () => {
      chatSocket.off("typing", handleStartTyping);
      chatSocket.off("stop typing", handleStopTyping);
    };
  }, [chatId]);

  return [typingStatus];
};

export default useTypingStatus;
