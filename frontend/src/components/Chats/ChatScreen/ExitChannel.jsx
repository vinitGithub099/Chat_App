import { useDispatch, useSelector } from "react-redux";
import { chatAPI } from "../../../api/chatAPI";
import { ERROR, INFO } from "../../../constants/constants";
import {
  removeChat,
  setCurrentChat,
} from "../../../store/Features/Chat/ChatSlice";
import Button from "../../Form/Button";
import { useToast } from "../../Hooks/useToast";
("../../../constants/constants");

export default function ExitChannel({ handleChannelExtras }) {
  const currChat = useSelector((state) => state.chat.currentChat);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { notify } = useToast();

  const exitChannel = () => {
    chatAPI
      .removeFromGroup({
        userId: user._id,
        chatId: currChat._id,
      })
      .then(() => {
        notify("You left the group", INFO);
        dispatch(removeChat(currChat));
        dispatch(setCurrentChat(null));
        handleChannelExtras(null);
      })
      .catch(() => notify("Failed to remove user", ERROR));
  };

  return (
    <div className="mx-auto py-4 px-4 sm:px-8 rounded-md">
      <p className="mb-2 text-lg text-light-1 font-semibold">
        Are you sure to exit channel ?
      </p>
      <Button
        type="button"
        className="px-4 py-1 my-2 bg-btn rounded-md text-light-1 font-semibold"
        handleClick={exitChannel}
      >
        Yes
      </Button>
    </div>
  );
}
