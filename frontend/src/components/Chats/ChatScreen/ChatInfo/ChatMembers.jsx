import { useSelector } from "react-redux";
import ListComponent from "../../../ListComponent";
import MemberCard from "./MemberCard";

export default function ChatMembers() {
  const currChat = useSelector((state) => state.chat.currentChat);
  return currChat && currChat.users && currChat.users.length ? (
    <div className="my-4">
      <h3 className="mx-4 text-lg text-light-2 py-2 font-semibold border-b border-b-light-3">
        Members
      </h3>
      <ListComponent
        list={currChat.users}
        subComponent={MemberCard}
        className="overflow-y-scroll scrollbar"
      ></ListComponent>
    </div>
  ) : null;
}
