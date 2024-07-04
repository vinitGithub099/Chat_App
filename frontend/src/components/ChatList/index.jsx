import { Button, Input, Spinner } from "@material-tailwind/react";
import cx from "classnames";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import _ from "underscore";
import { useLazyFetchChatsQuery } from "../../store/Services/chatAPI";
import ChatCard from "../ChatCard";
import classes from "./index.module.css";

const ChatList = () => {
  const [searchResponse, setSearchResponse] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [fetchChats, { isLoading }] = useLazyFetchChatsQuery();
  const chatList = useSelector((state) => state.chat.chats);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        await fetchChats();
      } catch (error) {
        console.log(error);
      }
    };
    fetchChatList();
  }, [fetchChats]);

  // fetch chats on input change
  const handleInputChange = (query) => {
    if (!query) {
      setSearchResponse([]);
      return;
    }

    const res = chatList.filter((chat) =>
      chat.chatName?.toLowerCase().includes(query)
    );

    setSearchResponse(res);
  };

  // debounce the change
  const debounceChange = _.debounce(handleInputChange, 800);

  // Immediate input change handler
  const handleChange = (e) => {
    // update the input state
    const value = e.target.value;
    setInputValue(value);

    debounceChange(value.toLowerCase().trim());
  };

  const handleClose = () => {
    setInputValue("");
    setSearchResponse([]);
  };

  useEffect(() => {}, []);

  return (
    <div className={classes.chatListContainer}>
      <div className={classes.searchBar}>
        <Input
          type="text"
          placeholder="Search"
          className={classes.search}
          value={inputValue}
          onChange={handleChange}
          labelProps={{ className: classes.labelProps }}
        />
        <Button
          variant="text"
          className={cx(classes.searchClose, {
            [classes.showCloseBtn]: searchResponse?.length,
          })}
          onClick={handleClose}
        >
          <AiOutlineClose size={20} />
        </Button>
      </div>
      <div className={classes.chatList}>
        {isLoading ? (
          <div className={classes.spinLoaderContainer}>
            <Spinner className={classes.spinner} />
            <span>Loading messages</span>
          </div>
        ) : searchResponse?.length ? (
          searchResponse.map((chat) => <ChatCard key={chat._id} {...chat} />)
        ) : chatList?.length ? (
          chatList.map((chat) => <ChatCard key={chat._id} {...chat} />)
        ) : null}
      </div>
    </div>
  );
};

export default ChatList;
