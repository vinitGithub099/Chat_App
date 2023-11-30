import { BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";
import userLogo from "../../../assets/profile-user_64572.png";
import UserCard from "./UserCard";
import UserDropDown from "./UserDropDown";

export default function UserInfo() {
  const user = useSelector((state) => state.auth.user);
  return (
    user && (
      <div className="px-4 py-2 flex flex-row items-center justify-between hover:bg-dark-1 relative">
        <UserCard
          className="text-light-1"
          imgSrc={userLogo}
          name={user.name}
        ></UserCard>
        <div
          className="px-2 text-light-2 group hover:cursor-pointer"
          type="submit"
        >
          <BiChevronDown size={20}></BiChevronDown>
          <UserDropDown></UserDropDown>
        </div>
      </div>
    )
  );
}
