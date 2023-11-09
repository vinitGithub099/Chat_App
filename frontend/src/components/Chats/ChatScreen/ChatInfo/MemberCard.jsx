import { HiOutlineDotsVertical, HiUserRemove } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { chatAPI } from "../../../../api/chatAPI";
import userLogo from "../../../../assets/profile-user_64572.png";
import { ERROR, SUCCESS } from "../../../../constants/constants";
import Button from "../../../Form/Button";
import { useToast } from "../../../Hooks/useToast";
import ListComponent from "../../../ListComponent";
import UserCard from "../../SideBar/UserCard";

export default function MemberCard(props) {
  const user = useSelector((state) => state.auth.user);
  return user && user._id !== props._id ? (
    <div className="flex flex-row items-center justify-between gap-4 py-2 hover:bg-dark-1 px-4">
      <UserCard
        {...props}
        imgSrc={userLogo}
        imgConfig="s"
        className="text-light-1"
      ></UserCard>
      <div className="text-light-1 hover:text-light-2 group hover:cursor-pointer flex items-end ">
        <HiOutlineDotsVertical size={20}></HiOutlineDotsVertical>
        <MemberDropdownList userId={props._id}></MemberDropdownList>
      </div>
    </div>
  ) : null;
}

function MemberDropdownList({ userId }) {
  const currChat = useSelector((state) => state.chat.currentChat);
  const { notify } = useToast();

  const removeMember = async (userId) => {
    chatAPI
      .removeFromGroup({
        userId: userId,
        chatId: currChat._id,
      })
      .then(() => notify("User removed successfully", SUCCESS))
      .catch(() => notify("Failed to remove user", ERROR));
  };

  const options = [
    {
      name: "Remove",
      icon: <HiUserRemove size={20}></HiUserRemove>,
      handleClick: () => removeMember(userId),
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
      className="m-1 p-2 hidden group-hover:block bg-dark-2 border border-light-3 rounded-md fixed right-2 mb-4"
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
