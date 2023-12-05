import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import _ from "underscore";
import { authAPI } from "../../../api/authAPI";
import { chatAPI } from "../../../api/chatAPI";
import userLogo from "../../../assets/profile-user_64572.png";
import {
  populateChat,
  setCurrentChat,
} from "../../../store/Features/Chat/ChatSlice";
import { handelTokenExpiration } from "../../../utils/Utils";
import Form from "../../Form/Form";
import DisplayChats from "./DisplayChats";
import UserCard from "./UserCard";

export default function SearchChat({ toggleSideBar }) {
  const [showChats, setShowChats] = useState(true);
  const [searchChats, setSearchChats] = useState([]);
  const handleSearchChats = (results) => setSearchChats(results);

  return (
    <div className="w-full flex flex-1 flex-col overflow-hidden">
      <SearchBar
        handleSearchChats={handleSearchChats}
        setShowChats={setShowChats}
      ></SearchBar>
      {!showChats ? (
        <SearchResults
          searchChats={searchChats}
          setShowChats={setShowChats}
        ></SearchResults>
      ) : (
        <DisplayChats toggleSideBar={toggleSideBar}></DisplayChats>
      )}
    </div>
  );
}

function SearchBar({ handleSearchChats, setShowChats }) {
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    const query = e.target.value;
    if (_.isEmpty(query)) {
      handleSearchChats([]);
      e.target.value = "";
      return;
    }
    authAPI
      .searchUser(query.trim())
      .then((res) => handleSearchChats(res))
      .catch((error) => {
        handelTokenExpiration(error, dispatch);
        handleSearchChats([]);
      });
  };
  const handleFocus = (e) => {
    setShowChats(false);
    e.target.value = "";
  };
  const handleBlur = (e) => {
    if (!e.target.value) setShowChats(true);
    e.target.value = "";
  };
  return (
    <Form
      className="my-2 px-4"
      fields={searchFormFields(handleSearch, handleFocus, handleBlur)}
      handleSubmit={() => {}}
    ></Form>
  );
}

const searchFormFields = (handleSearch, handleFocus, handleBlur) => [
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
    onFocus: handleFocus,
    onBlur: handleBlur,
  },
];

function SearchResults({ searchChats, setShowChats }) {
  return (
    <div className="flex flex-1 flex-col overflow-y-scroll scrollbar divide-y divide-light-3">
      {searchChats && searchChats.length ? (
        searchChats.map((chat) => (
          <SearchedChatResults
            key={chat._id}
            {...{ ...chat, setShowChats }}
          ></SearchedChatResults>
        ))
      ) : (
        <div className="text-light-2 font-semibold text-center">No results</div>
      )}
    </div>
  );
}

function SearchedChatResults(props) {
  const { setShowChats } = props;
  const dispatch = useDispatch();
  const handleClick = () => {
    chatAPI
      .accessChat({ userId: props._id })
      .then((res) => {
        dispatch(setCurrentChat(res));
        dispatch(populateChat(res));
        setShowChats(true);
      })
      .catch((error) => handelTokenExpiration(error, dispatch));
  };

  return (
    <UserCard
      {...props}
      imgSrc={userLogo}
      imgConfig="s"
      className="text-light-1 py-2 hover:bg-dark-1 px-4 hover:cursor-pointer"
      handleClick={handleClick}
    ></UserCard>
  );
}
