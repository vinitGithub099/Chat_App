import { useSelector } from "react-redux";
import ListComponent from "../../../ListComponent";
import MemberCard from "./MemberCard";

export default function ChatMembers() {
  const currentChat = useSelector((state) => state.chat.currentChat);
  return currentChat && currentChat.users && currentChat.users.length ? (
    <div className="my-4">
      <h3 className="mx-4 text-lg text-light-2 py-2 font-semibold border-b border-b-light-3">
        Members
      </h3>
      <ListComponent
        list={currentChat.users}
        subComponent={MemberCard}
        className="overflow-y-scroll scrollbar"
      ></ListComponent>
    </div>
  ) : null;
}
