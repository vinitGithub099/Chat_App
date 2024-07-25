import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "../../../constants/sideMenu";

import {
  insertChat,
  updateCurrentChat,
} from "../../../store/Features/Chat/chatSlice";
import { setActitvityLabel } from "../../../store/Features/UI/uiSlice";
import { useAccessChatMutation } from "../../../store/Services/chatAPI";
import UserCard from "../../UserCard";
import classes from "./index.module.css";

const SearchUserCard = (props) => {
  const { _id } = props;
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chat.chats);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const [accessChat] = useAccessChatMutation();

  const displayCurrentChat = (chat) => {
    dispatch(insertChat(chat));
    dispatch(updateCurrentChat(chat));
    dispatch(setActitvityLabel(MENU_ITEMS.CHATS.label));
  };

  const handleAccessChat = async (_id) => {
    // search in local chatList first
    const singleChat = Object.values(chatList)?.length
      ? Object.values(chatList).find((chat) =>
          !chat.isGroupChat
            ? chat.users?.find((user) => user?._id === _id)
            : null
        )
      : null;

    if (singleChat) {
      displayCurrentChat(singleChat);
      return;
    }

    // if not found then make api call
    try {
      const res = await accessChat(_id);
      displayCurrentChat(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkActiveChat = () =>
    currentChat?.users.some((user) => _id === user?._id);

  const createHandleClick = (_id) => () => {
    handleAccessChat(_id);
  };

  return (
    <UserCard
      key={_id}
      user={props}
      avatarSize={"sm"}
      classsName={{ [classes.active]: checkActiveChat() }}
      onClick={createHandleClick(_id)}
    />
  );
};

export default SearchUserCard;
