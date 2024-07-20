import { Button, Chip, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
import { MdPersonAddAlt } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "../../constants/variants";
import { buildChatName } from "../../helpers/helpers";
import { removeChatMember } from "../../store/Features/Chat/chatSlice";
import { useRemoveGroupMemberMutation } from "../../store/Services/chatAPI";
import AddMember from "../AddMember";
import Modal from "../Modal";
import UserCard from "../UserCard";
import classes from "./index.module.css";
import LeaveChatDialog from "./LeaveChatDialog";

const ChatInfo = ({ openChatInfo, handleChatInfo }) => {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const user = useSelector((state) => state.auth.user);
  const [openLeaveChat, setOpenLeaveChat] = useState(false);
  const [openAddMember, setOpenAddMember] = useState(false);
  const [removeGroupMember] = useRemoveGroupMemberMutation();
  const dispatch = useDispatch();

  const handleLeaveChat = () => setOpenLeaveChat((prev) => !prev);
  const handleAddMember = () => setOpenAddMember((prev) => !prev);

  const handleRemoveGroupMember = async (e) => {
    const memberId = e.currentTarget.value;
    try {
      const queryData = { chatId: currentChat?._id, userId: memberId };
      await removeGroupMember(queryData);
      dispatch(removeChatMember(queryData));
    } catch (error) {
      console.log(error);
    }
  };

  const Header = () => (
    <>
      <Typography variant={TYPOGRAPHY_VARIANT.H4}>
        {buildChatName(currentChat, user)}
      </Typography>
      <Button
        variant={BUTTON_VARIANT.TEXT}
        className={classes.closeBtn}
        onClick={handleChatInfo}
      >
        <AiOutlineClose />
      </Button>
    </>
  );

  const MemberList = () =>
    currentChat?.users?.length
      ? currentChat.users.map((member) => (
          <div key={member._id} className={classes.memberCard}>
            <UserCard
              user={{
                ...member,
                name: member.name === user.name ? "You" : member.name,
              }}
              avatarSize="xs"
            />
            {currentChat?.groupAdmin?._id === member?._id ? (
              <Chip value="Admin" className={classes.adminChip} />
            ) : currentChat?.groupAdmin?._id === user?._id ? (
              <Button
                variant={BUTTON_VARIANT.TEXT}
                className={classes.removeBtn}
                ripple={false}
                disabled={currentChat?.groupAdmin?._id !== user?._id}
                onClick={handleRemoveGroupMember}
                value={member?._id}
              >
                Remove
              </Button>
            ) : null}
          </div>
        ))
      : "Failed to load members!";

  const Body = () => (
    <>
      <Typography
        variant={TYPOGRAPHY_VARIANT.H6}
        className={classes.sectionHeading}
      >
        Channel Info
      </Typography>
      <section className={classes.chatInfoSection}>
        <div className={classes.sectionHeading}>
          <AiOutlineInfoCircle size={25} />
          <Typography variant={TYPOGRAPHY_VARIANT.H6}>Description</Typography>
        </div>
        <Typography
          variant={TYPOGRAPHY_VARIANT.SMALL}
          className={classes.chatDescription}
        >
          {currentChat.description}
        </Typography>
      </section>
      <section className={classes.chatInfoSection}>
        <div className={classes.sectionHeading}>
          <TiGroup size={25} />
          <Typography variant={TYPOGRAPHY_VARIANT.H6}>Members</Typography>
        </div>
        <div className={classes.memberList}>
          <MemberList />
        </div>
      </section>
    </>
  );

  const Footer = () => (
    <>
      <Typography
        variant={TYPOGRAPHY_VARIANT.H6}
        className={classes.sectionHeading}
      >
        Only admin can acces below options
      </Typography>
      <Button
        variant={BUTTON_VARIANT.TEXT}
        className={classes.btn}
        onClick={handleAddMember}
        disabled={currentChat?.groupAdmin?._id !== user?._id}
      >
        <MdPersonAddAlt size={20} />
        <Typography variant={TYPOGRAPHY_VARIANT.SMALL}>Add Member</Typography>
      </Button>
      <Button
        variant={BUTTON_VARIANT.TEXT}
        className={classes.leaveChannelBtn}
        onClick={handleLeaveChat}
      >
        <IoExitOutline size={20} />
        <Typography variant={TYPOGRAPHY_VARIANT.SMALL}>
          Leave Channel
        </Typography>
      </Button>
    </>
  );

  return (
    <Modal
      open={openChatInfo}
      size="sm"
      handler={handleChatInfo}
      classNames={{
        container: classes.chatInfoContainer,
        header: classes.chatInfoHeader,
        body: classes.chatInfoBody,
        footer: classes.chatInfoFooter,
      }}
      header={<Header />}
      body={<Body />}
      footer={<Footer />}
    >
      <LeaveChatDialog
        openLeaveChat={openLeaveChat}
        handleLeaveChat={handleLeaveChat}
      />
      <AddMember
        openAddMember={openAddMember}
        handleAddMember={handleAddMember}
      ></AddMember>
    </Modal>
  );
};

export default ChatInfo;
