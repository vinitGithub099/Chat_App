import { FiSearch } from "react-icons/fi";
import Form from "../../Form/Form";
import DisplayChats from "./DisplayChats";

export default function SearchChat({ toggleSideBar }) {
  return (
    <div className="w-full flex flex-1 flex-col overflow-hidden">
      <SearchBar></SearchBar>
      <DisplayChats toggleSideBar={toggleSideBar}></DisplayChats>
    </div>
  );
}

function SearchBar() {
  return (
    <Form
      className="my-2 px-4"
      fields={searchFormFields}
      handleSubmit={(e) => console.log(e)}
    ></Form>
  );
}

const searchFormFields = [
  {
    type: "text",
    label: "",
    name: "searchChat",
    id: "searchChat",
    defaultValue: "",
    containerClassName: "py-2 rounded-md bg-dark-3",
    className: "rounded-md bg-dark-3 border-b",
    inputClassName: "w-full outline-none bg-dark-3 text-light-1",
    placeholder: "Search @chat",
    required: true,
    icon: { icon: FiSearch, size: 20, className: "p-2 text-gray-500" },
    onChange: (e) => console.log(e.target.value),
  },
];
