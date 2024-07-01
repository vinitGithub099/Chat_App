import { Button, Input } from "@material-tailwind/react";
import cx from "classnames";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import _ from "underscore";
import ChatCard from "../ChatCard";
import { chats } from "./chatList";
import classes from "./index.module.css";

const ChatList = ({ chatList = chats }) => {
  const [searchResponse, setSearchResponse] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // fetch chats on input change
  const handleInputChange = (query) => {
    if (!query) {
      setSearchResponse([]);
      return;
    }

    const res = chats.filter((chat) =>
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
        {searchResponse?.length
          ? searchResponse.map((chat, index) => (
              <ChatCard key={index} {...chat} />
            ))
          : chatList?.length
          ? chatList.map((chat, index) => <ChatCard key={index} {...chat} />)
          : null}
      </div>
    </div>
  );
};

export default ChatList;
