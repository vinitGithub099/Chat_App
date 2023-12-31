import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RiAddFill } from "react-icons/ri";
import Button from "../../Form/Button";
import ChannelForm from "./ChannelForm";

export default function SideBarHeader({ toggleSideBar }) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((currState) => !currState);

  return (
    <div className="w-full mb-2 py-2 px-4 flex flex-row justify-between">
      <div className="flex gap-2">
        <Button
          className="sm:hidden rounded-sm pr-1 text-light-1"
          type="submit"
          handleClick={toggleSideBar}
        >
          <IoIosArrowBack size={20}></IoIosArrowBack>
        </Button>
        <h4 className="px-2 text-xl font-semibold text-light-1">Channel</h4>
      </div>
      <Button
        className="rounded-md text-light-1 bg-light-3 p-2 ml-4"
        handleClick={toggleModal}
        type="submit"
      >
        <RiAddFill></RiAddFill>
      </Button>
      <ChannelForm
        showModal={showModal}
        toggleModal={toggleModal}
        toggleSideBar={toggleSideBar}
      ></ChannelForm>
    </div>
  );
}
