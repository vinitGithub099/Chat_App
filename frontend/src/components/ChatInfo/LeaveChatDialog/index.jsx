import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeChat,
  updateCurrentChat,
} from "../../../store/Features/Chat/chatSlice";
import { setActitvityLabel } from "../../../store/Features/UI/uiSlice";
import { useRemoveGroupMemberMutation } from "../../../store/Services/chatAPI";
import Modal from "../../Modal";
import classes from "./index.module.css";

const LeaveChatDialog = ({ openLeaveChat, handleLeaveChat }) => {
  const [removeGroupMember] = useRemoveGroupMemberMutation();
  const currentChat = useSelector((state) => state.chat.currentChat);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const leaveChat = async () => {
    try {
      await removeGroupMember({ chatId: currentChat._id, userId: user._id });
      dispatch(setActitvityLabel(null));
      dispatch(removeChat(currentChat._id));
      dispatch(updateCurrentChat(null));
    } catch (error) {
      console.log(error);
    }
  };

  const header = "Do you really want to leave this chat?";

  const body =
    currentChat.groupAdmin?._id === user._id
      ? `You are an admin of this group. If you leave then there won't be any
      admin to this group.`
      : null;

  const Footer = () => (
    <>
      <Button variant="text" className={classes.leaveBtn} onClick={leaveChat}>
        Leave
      </Button>
      <Button
        variant="text"
        className={classes.cancelBtn}
        onClick={handleLeaveChat}
      >
        Cancel
      </Button>
    </>
  );

  return (
    <Modal
      open={openLeaveChat}
      handler={handleLeaveChat}
      classNames={{
        container: classes.leaveChatContainer,
        header: classes.leaveChatHeader,
        body: classes.leaveChatBody,
        footer: classes.leaveChatFooter,
      }}
      header={header}
      body={body}
      footer={<Footer />}
    />
  );
};

export default LeaveChatDialog;
