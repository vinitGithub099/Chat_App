import { useEffect } from "react";
import { authAPI } from "../../api/authAPI";

const Chats = () => {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await authAPI.searchUser("");
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  return <div>This is chats page!</div>;
};

export default Chats;
