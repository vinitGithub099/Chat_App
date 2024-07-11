import { useEffect } from "react";
import { useLazyFetchChatsQuery } from "../../store/Services/chatAPI";

const useFetchChats = () => {
  const [fetchChats, { isLoading, error }] = useLazyFetchChatsQuery();

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        await fetchChats();
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };
    fetchChatList();
  }, [fetchChats]);

  return { isLoading, error };
};

export default useFetchChats;
