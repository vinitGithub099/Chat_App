import { Avatar, Typography } from "@material-tailwind/react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import userLogo from "../../assets/profile-user_64572.png";
import { MENU_ITEMS } from "../../constants/sideMenu";
import {
  insertChat,
  updateCurrentChat,
} from "../../store/Features/Chat/chatSlice";
import { setActitvityLabel } from "../../store/Features/UI/uiSlice";
import { useAccessChatMutation } from "../../store/Services/chatAPI";
import classes from "./index.module.css";

const UserCard = (props) => {
  const { _id, pic, name, email } = props;
  const [accessChat] = useAccessChatMutation();
  const chatList = useSelector((state) => state.chat.chats);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const dispatch = useDispatch();

  const displayCurrentChat = (chat) => {
    dispatch(insertChat(chat));
    dispatch(updateCurrentChat(chat));
    dispatch(setActitvityLabel(MENU_ITEMS.CHATS.label));
  };

  const handleAccesChat = async () => {
    // find if the selected chat already exists in the local chatList
    const singleChat = chatList?.length
      ? chatList.find((chat) =>
          !chat.isGroupChat
            ? chat.users?.find((user) => user?._id === _id)
            : null
        )
      : null;

    if (singleChat) {
      displayCurrentChat(singleChat);
      return;
    }

    // if not found then fetch via search api call
    try {
      const res = await accessChat(_id);
      displayCurrentChat(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkActiveChat = () =>
    currentChat?.users[0]._id === _id || currentChat?.users[1]._id === _id;

  return (
    <div
      className={cx(classes.userCardContainer, {
        [classes.active]: checkActiveChat(),
      })}
      onClick={handleAccesChat}
    >
      <Avatar src={pic || userLogo} size="sm" className={classes.avatar} />
      <div className={classes.userInfo}>
        <Typography variant="small" className={classes.userName}>
          {name ?? ""}
        </Typography>
        <Typography variant="small" className={classes.userEmail}>
          {email ?? ""}
        </Typography>
      </div>
    </div>
  );
};

export default UserCard;
