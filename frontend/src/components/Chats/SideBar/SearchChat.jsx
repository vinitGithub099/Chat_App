import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import _ from "underscore";
import { authAPI } from "../../../api/authAPI";
import userLogo from "../../../assets/profile-user_64572.png";
import Form from "../../Form/Form";
import ListComponent from "../../ListComponent";
import DisplayChats from "./DisplayChats";
import UserCard from "./UserCard";

export default function SearchChat({ toggleSideBar }) {
  const [searchChats, setSearchChats] = useState([]);

  const handleSearchChats = (results) => setSearchChats(results);
  
  return (
    <div className="w-full flex flex-1 flex-col overflow-hidden">
      <SearchBar handleSearchChats={handleSearchChats}></SearchBar>
      {searchChats && searchChats.length ? (
        <SearchResults searchUsers={searchChats}></SearchResults>
      ) : (
        <DisplayChats toggleSideBar={toggleSideBar}></DisplayChats>
      )}
    </div>
  );
}

function SearchBar({ handleSearchChats }) {
  const handleSearch = (e) => {
    const query = e.target.value?.trim();
    if (_.isEmpty(query)) {
      handleSearchChats([]);
      return;
    }
    authAPI
      .searchUser(query.trim())
      .then((res) => {
        console.log(res);
        handleSearchChats(res);
      })
      .catch(() => handleSearchChats([]));
  };
  return (
    <Form
      className="my-2 px-4"
      fields={searchFormFields(handleSearch)}
      handleSubmit={() => {}}
    ></Form>
  );
}

const searchFormFields = (handleSearch) => [
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
    onChange: handleSearch,
  },
];

function SearchResults({ searchUsers }) {
  return (
    <ListComponent
      list={searchUsers}
      className="flex flex-1 flex-col overflow-y-scroll scrollbar divide-y divide-light-3"
      subComponent={SubComponent}
    ></ListComponent>
  );
}

function SubComponent(props) {
  return (
    <UserCard
      {...props}
      imgSrc={userLogo}
      imgConfig="s"
      className="text-light-1 py-2 hover:bg-dark-1 px-4"
    ></UserCard>
  );
}
