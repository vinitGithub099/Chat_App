import { useSelector } from "react-redux";
import { useToast } from "../../../Hooks/useToast";
import { chatAPI } from "../../../../api/chatAPI";
import { ERROR, SUCCESS } from "../../../../constants/constants";
import { HiUserRemove } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";
import ListComponent from "../../../ListComponent";
import { MemberDropdownItem } from "./MemberDropdownItem";

export default function MemberDropdownList({ userId }) {
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


