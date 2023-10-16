import SampleHome from "../SampleHome";
import userLogo from "../assets/profile-user_64572.png";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import ChatScreen from "../components/Chats/ChatScreen";
import MessageCard from "../components/Chats/MessageCard";
import SideBar from "../components/Chats/SideBar";
import UserAvatar from "../components/Chats/UserAvatar";
import UserCard from "../components/Chats/UserCard";
import Login from "../components/LoginSignUp/Login";
import SignUp from "../components/LoginSignUp/SignUp";
import EditProfile from "../components/Profile/EditProfile";
import Profile from "../components/Profile/Profile";
import ChatsPage from "../pages/ChatsPage";
export const router = [
  {
    children: [
      {
        path: "/",
        element: <SampleHome></SampleHome>,
      },
      {
        path: "login",
        element: <Login className="mt-20"></Login>,
      },
      {
        path: "register",
        element: <SignUp className="mt-20"></SignUp>,
      },
      {
        path: "profile/",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute>
                <Profile className=""></Profile>
              </ProtectedRoute>
            ),
          },
          {
            path: "edit",
            element: (
              <ProtectedRoute>
                <EditProfile className=""></EditProfile>
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "chat",
        element: <ChatsPage className=""></ChatsPage>,
      },
      {
        path: "message-card",
        element: (
          <MessageCard
            className="m-2 border-2 rounded-md"
            senderName={"Vinit Kumbhare"}
            timeStamp={1480687432}
            message=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's st"
          ></MessageCard>
        ),
      },
      {
        path: "user-avatar",
        element: (
          <UserAvatar
            className="mx-auto mt-12 border-2 rounded-full"
            imgSrc={userLogo}
            config={"m"}
          ></UserAvatar>
        ),
      },
      {
        path: "user-card",
        element: (
          <UserCard
            className="m-2 rounded-md"
            imgSrc={userLogo}
            name="Vinit Kumbhare"
          ></UserCard>
        ),
      },
      {
        path: "side-bar",
        element: <SideBar className=""></SideBar>,
      },
      {
        path: "chat-screen",
        element: <ChatScreen className=""></ChatScreen>,
      },
    ],
  },
];
