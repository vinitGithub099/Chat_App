import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import Button from "../../Form/Button";
import userLogo from "../../assets/profile-user_64572.png";
import UserCard from "./UserCard";
import UserDropDown from "./UserDropDown";

export default function UserInfo() {
  const [hideDropdown, setHideDropdown] = useState(true);
  const toggleDropDown = () => setHideDropdown((prev) => !prev);
  return (
    <div className="p-2 flex flex-row items-center justify-between bg-dark-3">
      <UserCard
        className="text-light-1"
        imgSrc={userLogo}
        name="Hello World!"
      ></UserCard>
      <Button
        className="px-2 text-gray-500"
        type="submit"
        onClick={toggleDropDown}
      >
        <BiChevronDown size={20}></BiChevronDown>
        {!hideDropdown && <UserDropDown></UserDropDown>}
      </Button>
    </div>
  );
}
