import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import userLogo from "../../../assets/profile-user_64572.png";
import Button from "../../Form/Button";
import SearchChat from "./SearchChat";
import SideBarBtn from "./SideBarBtn";
import UserCard from "./UserCard";
import UserDropDown from "./UserDropDown";

export default function SideBar({ className, sidebarOpen, toggleSideBar }) {
  return sidebarOpen ? (
    <div
      className={`max-mobile:w-full px-8 py-2 max-mobile:fixed max-h-screen flex flex-row bg-dark-2 ${className}`}
    >
      <div className="max-mobile:w-sidebar w-full flex flex-col">
        <SideBarBtn toggleSideBar={toggleSideBar}></SideBarBtn>
        <SearchChat></SearchChat>
        <UserInfo></UserInfo>
      </div>
      <div className="mobile:hidden flex flex-1 opacity-25 bg-black"></div>
    </div>
  ) : null;
}

function UserInfo() {
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
