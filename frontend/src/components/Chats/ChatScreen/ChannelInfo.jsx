import { BiArrowBack } from "react-icons/bi";
import { HiOutlineDotsVertical, HiUserRemove } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { chatAPI } from "../../../api/chatAPI";
import userLogo from "../../../assets/profile-user_64572.png";
import { ERROR, SUCCESS } from "../../../constants/constants";
import Button from "../../Form/Button";
import { useToast } from "../../Hooks/useToast";
import ListComponent from "../../ListComponent";
import UserCard from "../SideBar/UserCard";
import UserAvatar from "../UserAvatar";

export default function ChannelInfo({ handleChannelExtras, className }) {
  return (
    <div
      className={`w-full sm:w-1/2 h-screen bg-dark-3 fixed right-0 flex flex-col rounded-tl-lg rounded-bl-lg ${className}`}
    >
      <div className="p-4 text-light-1 flex flex-row items-center border-b border-light-3">
        <Button
          className="p-1 rounded-full cursor-pointer hover:bg-light-3 hover:bg-opacity-60"
          onClick={() => handleChannelExtras(null)}
        >
          <BiArrowBack size={20}></BiArrowBack>
        </Button>
      </div>
      <div className="flex-1 sm:px-4">
        <GroupIcon></GroupIcon>
        <GroupDescription></GroupDescription>
        <GroupMembers></GroupMembers>
      </div>
    </div>
  );
}

function GroupIcon() {
  const currChat = useSelector((state) => state.chat.currentChat);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="m-4 p-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500  rounded-full">
        <UserAvatar
          altText={"hello world"}
          className=""
          imgSrc={userLogo}
          config={"xl"}
        ></UserAvatar>
      </div>
      <h3 className="text-xl text-light-1 py-2 text-center flex-1 font-semibold">
        {currChat ? currChat.chatName : ""}
      </h3>
      {currChat && currChat.users && currChat.users.length > 2 ? (
        <span className="text-light-2">{`${currChat.users.length} Participants`}</span>
      ) : null}
    </div>
  );
}

function GroupDescription() {
  const currChat = useSelector((state) => state.chat.currentChat);
  const desc = currChat.description;
  return (
    <div className="p-4 my-4">
      <h3 className="text-lg text-light-2 font-semibold border-b border-b-light-3 py-2">
        Description
      </h3>
      <p className="text-light-1 text-sm py-2">
        {desc ? desc : "Hey Everyone!"}
      </p>
    </div>
  );
}

function GroupMembers() {
  const currChat = useSelector((state) => state.chat.currentChat);
  return currChat && currChat.users && currChat.users.length > 2 ? (
    <div className="my-4">
      <h3 className="mx-4 text-lg text-light-2 py-2 font-semibold border-b border-b-light-3">
        Members
      </h3>
      <ListComponent
        list={currChat.users}
        subComponent={MemberCard}
        className="overflow-y-scroll scrollbar"
      ></ListComponent>
    </div>
  ) : null;
}

function MemberCard(props) {
  const user = useSelector((state) => state.auth.user);
  return user && user._id !== props._id ? (
    <div className="flex flex-row items-center justify-between gap-4 py-2 hover:bg-dark-1 px-4">
      <UserCard
        {...props}
        imgSrc={userLogo}
        imgConfig="s"
        className="text-light-1"
      ></UserCard>
      <div className="text-light-1 hover:text-light-2 group hover:cursor-pointer">
        <HiOutlineDotsVertical size={20}></HiOutlineDotsVertical>
        <MemberDropdownList userId={props._id}></MemberDropdownList>
      </div>
    </div>
  ) : null;
}

function MemberDropdownList({ userId }) {
  const currChat = useSelector((state) => state.chat.currentChat);
  const { notify } = useToast();

  const removeMember = async (userId, chatId) => {
    try {
      await chatAPI.removeFromGroup({
        userId: userId,
        chatId: chatId,
      });
      notify("User removed successfully", SUCCESS);
    } catch (error) {
      notify("Failed to remove user", ERROR);
    }
  };

  const options = [
    {
      name: "Remove",
      icon: <HiUserRemove size={20}></HiUserRemove>,
      handleClick: () => removeMember(userId, currChat._id),
    },
    {
      name: "Make Admin",
      icon: <RiAdminFill size={20}></RiAdminFill>,
      handleClick: () => {},
    },
  ];
  return (
    <ListComponent
      list={options}
      className="m-1 p-2 hidden group-hover:block fixed right-0 bg-dark-2 border border-light-3 rounded-md"
      subComponent={MemberDropdownItem}
      userId={userId}
    ></ListComponent>
  );
}

function MemberDropdownItem({ name, icon, handleClick }) {
  return (
    <Button
      type="button"
      className="w-full text-light-1 flex items-center gap-2 p-2 hover:bg-dark-1"
      onClick={handleClick}
    >
      <span>{icon}</span>
      <p>{name}</p>
    </Button>
  );
}
