import { HiUserRemove } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { chatAPI } from "../../../../api/chatAPI";
import { ERROR, SUCCESS } from "../../../../constants/constants";
import { removeChatMember } from "../../../../store/Features/Chat/ChatSlice";
import { handelTokenExpiration } from "../../../../utils/Utils";
import { useToast } from "../../../Hooks/useToast";
import { MemberDropdownItem } from "./MemberDropdownItem";

export default function MemberDropdownList({ userId }) {
  const currChat = useSelector((state) => state.chat.currentChat);
  const dispatch = useDispatch();
  const { notify } = useToast();

  const removeMember = (userId) => {
    chatAPI
      .removeFromGroup({
        userId: userId,
        chatId: currChat._id,
      })
      .then(() => {
        notify("User removed successfully", SUCCESS);
        dispatch(removeChatMember(userId));
      })
      .catch((error) => {
        handelTokenExpiration(error, dispatch);
        notify("Failed to remove user", ERROR);
      });
  };

  const options = [
    {
      name: "Remove",
      icon: <HiUserRemove size={20}></HiUserRemove>,
      handleClick: () => removeMember(userId),
    },
  ];
  return options && options.length
    ? options.map((item, index) => (
        <div
          key={index}
          className="m-1 p-2 hidden group-hover:block bg-dark-2 border border-light-3 rounded-md absolute right-2 mb-4"
        >
          <MemberDropdownItem {...item}></MemberDropdownItem>
        </div>
      ))
    : null;
}
