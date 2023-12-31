import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import userLogo from "../../../../assets/profile-user_64572.png";
import UserCard from "../../SideBar/UserCard";
import MemberDropdownList from "./MemberdropdownList";

export default function MemberCard(props) {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex flex-row items-center justify-between gap-4 py-2 hover:bg-dark-1 px-4">
      <UserCard
        {...props}
        imgSrc={userLogo}
        imgConfig="s"
        className="text-light-1"
      ></UserCard>
      {currentChat &&
      currentChat.groupAdmin &&
      props._id === currentChat.groupAdmin._id ? (
        <span className="px-2 py-1 text-xs text-light-1 border border-light-3 bg-dark-1 rounded-md">{`Admin`}</span>
      ) : null}
      {user && user._id === props._id ? null : (
        <div className="text-light-1 hover:text-light-2 group hover:cursor-pointer flex items-end ">
          <HiOutlineDotsVertical size={20}></HiOutlineDotsVertical>
          <MemberDropdownList userId={props._id}></MemberDropdownList>
        </div>
      )}
    </div>
  );
}
