import { FiSearch } from "react-icons/fi";
import userLogo from "../../../assets/profile-user_64572.png";
import Form from "../../Form/Form";
import ListComponent from "../../ListComponent";
import UserAvatar from "../UserAvatar";

export default function SearchChat() {
  return (
    <div className="w-full flex flex-col overflow-hidden">
      <SearchBar></SearchBar>
      <SearchChatResults></SearchChatResults>
    </div>
  );
}

function SearchBar() {
  return (
    <Form
      className="my-4 "
      fields={searchFormFields}
      handleSubmit={(e) => console.log(e)}
    ></Form>
  );
}

function SearchChatResults() {
  const SubComponent = ({ name }) => (
    <div className="p-2 flex flex-row items-center gap-4 my-2 rounded-md ">
      <UserAvatar
        altText={"hello world"}
        className=""
        imgSrc={userLogo}
        config={"s"}
      ></UserAvatar>
      <p className="text text-gray-500 font-bold">{name}</p>
    </div>
  );
  return (
    <ListComponent
      list={names}
      className="mb-2 overflow-y-scroll scrollbar"
      subComponent={SubComponent}
    ></ListComponent>
  );
}

const searchFormFields = [
  {
    type: "text",
    label: "",
    name: "searchChat",
    id: "searchChat",
    defaultValue: "",
    containerClassName: "py-2 rounded-md bg-light-3",
    className: "rounded-md bg-light-3",
    inputClassName: "w-full outline-none bg-light-3 text-light-1",
    placeholder: "Search @chat",
    required: true,
    icon: { icon: FiSearch, size: 20, className: "p-2 text-gray-500" },
    onChange: (e) => console.log(e.target.value),
  },
];

const names = [
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
  { name: "Hello World!" },
];
