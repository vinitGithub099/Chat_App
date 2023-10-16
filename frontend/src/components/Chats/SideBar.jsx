import { useState } from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowDropdown,
} from "react-icons/io";
import { RiAddFill } from "react-icons/ri";
import Button from "../Form/Button";
import UserCard from "./UserCard";

export default function SideBar({ className }) {
  const [isSideBarOpen, setisSideBarOpen] = useState(true);
  const handleBackButton = () => setisSideBarOpen((prev) => !prev);
  return isSideBarOpen ? (
    <div
      className={`p-1 border-2 inline-flex flex-col justify-between ${className}`}
    >
      <div className="w-full border-2 py-2 flex flex-row justify-between">
        <div className="flex gap-2">
          <Button
            className="rounded-sm px-1"
            type="submit"
            handleClick={handleBackButton}
          >
            <IoIosArrowBack></IoIosArrowBack>
          </Button>
          <h4 className="text-lg font-semibold">Channel</h4>
        </div>
        <Button className="bg-gray-400 rounded-sm px-1 ml-4" type="submit">
          <RiAddFill></RiAddFill>
        </Button>
      </div>
      {/* <Input
        field={{
          type: "text",
          icon: {
            icon: <FiSearch></FiSearch>,
          },
        }}
      ></Input> */}
      <div className="border-2 flex flex-row items-center">
        <UserCard name="Hello World!"></UserCard>
        <Button className="px-1 ml-4" type="submit">
          <IoMdArrowDropdown></IoMdArrowDropdown>
        </Button>
      </div>
    </div>
  ) : (
    <div className="flex ">
      <Button className="border-2" type="submit" handleClick={handleBackButton}>
        <IoIosArrowForward></IoIosArrowForward>
      </Button>
    </div>
  );
}
