import { Button, Input, Spinner, Typography } from "@material-tailwind/react";
import cx from "classnames";
import { useCallback, useEffect, useState } from "react";
import { AiFillWarning, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";
import { FORM_FIELD } from "../../constants/formFields";
import {
  BUTTON_VARIANT,
  INPUT_VARIANT,
  TYPOGRAPHY_VARIANT,
} from "../../constants/variants";
import useJoinChatRooms from "../../hooks/useJoinChatRooms";
import { populateChats } from "../../store/Features/Chat/chatSlice";
import { fetchSearchResults } from "../../store/Features/Search/searchActions";
import { useLazyFetchChatsQuery } from "../../store/Services/chatAPI";
import ChatCard from "../ChatCard";
import SearchList from "../SearchList";
import classes from "./index.module.css";

const ChatList = () => {
  const chatList = useSelector((state) => state.chat.chats);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [fetchChats, { isLoading, error }] = useLazyFetchChatsQuery();

  useEffect(() => {
    fetchChats().then((res) => dispatch(populateChats(res.data)));
  }, [dispatch, fetchChats]);

  useJoinChatRooms(chatList, user);

  // Define the debounced function
  const debounceChange = useCallback(
    _.debounce(async (query) => {
      if (query) {
        dispatch(fetchSearchResults({ query }));
      }
    }, 800),
    [] // Only create the debounce function once
  );

  // Input change handler
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debounceChange(value.toLowerCase().trim());
  };

  // Handle clearing input
  const handleClose = () => {
    setInputValue("");
    setIsFocused(false);
  };

  const handleFocus = () => setIsFocused(true);

  return (
    <div className={classes.chatListContainer}>
      {isLoading ? (
        <div className={classes.spinLoaderContainer}>
          <Spinner className={classes.spinner} />
          <span>Loading messages</span>
        </div>
      ) : error ? (
        <div className={classes.chatListError}>
          <AiFillWarning size={20} className={classes.warnIcon} />
          <Typography variant={TYPOGRAPHY_VARIANT.SMALL}>
            Something went wrong!
          </Typography>
        </div>
      ) : (
        <>
          <div className={classes.searchBar}>
            <Input
              variant={INPUT_VARIANT.OUTLINED}
              type={FORM_FIELD.TEXT}
              placeholder="Search"
              className={classes.search}
              value={inputValue}
              onChange={handleChange}
              onFocus={handleFocus}
              labelProps={{ className: classes.labelProps }}
            />
            <Button
              variant={BUTTON_VARIANT.TEXT}
              className={cx(classes.searchClose, {
                [classes.showCloseBtn]: isFocused,
              })}
              onClick={handleClose}
            >
              <AiOutlineClose size={20} />
            </Button>
          </div>
          <div className={classes.chatList}>
            {isFocused ? (
              <SearchList />
            ) : chatList && Object.values(chatList)?.length ? (
              Object.values(chatList).map((chat) => (
                <ChatCard key={chat._id} {...chat} />
              ))
            ) : (
              <Typography variant={TYPOGRAPHY_VARIANT.PARAGRAPH} className="py-2 text-center font-semibold">
                Oops! No chats to show.
              </Typography>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatList;
