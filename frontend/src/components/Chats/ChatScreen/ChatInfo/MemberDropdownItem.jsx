import { useSelector } from "react-redux";
import Button from "../../../Form/Button";

export function MemberDropdownItem({ name, icon, handleClick }) {
  const currChat = useSelector((state) => state.chat.currentChat);
  const user = useSelector((state) => state.auth.user);

  /* if the current user is group admin, then only allow to do any activity with members */
  const isUserAdmin =
    currChat && currChat.groupAdmin && currChat.groupAdmin._id !== user._id;

  return (
    <Button
      type="button"
      className={`w-full text-light-1 flex items-center gap-2 p-2 ${
        isUserAdmin ? `hover:cursor-not-allowed` : `hover:bg-dark-1 `
      }`}
      handleClick={handleClick}
      disabled={isUserAdmin}
    >
      <span>{icon}</span>
      <span>{name}</span>
    </Button>
  );
}
