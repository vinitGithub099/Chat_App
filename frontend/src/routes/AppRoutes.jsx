import App from "../App";
import userLogo from "../assets/profile-user_64572.png";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import ChatScreen from "../components/Chats/ChatScreen/ChatScreen";
import MessageCard from "../components/Chats/SideBar/MessageCard";
import SideBar from "../components/Chats/SideBar/SideBar";
import UserCard from "../components/Chats/SideBar/UserCard";
import DemoForm from "../components/DemoForm";
import ErrorPage from "../components/Error/ErrorPage";
import AuthTokenExpiration from "../components/Expiration/AuthTokenExpiration";
import Login from "../components/LoginSignUp/Login";
import SignUp from "../components/LoginSignUp/SignUp";
import EditProfile from "../components/Profile/EditProfile";
import Profile from "../components/Profile/Profile";
import ToastDemo from "../components/Toast/ToastDemo";
import UserAvatar from "../components/UserAvatar";
import ChatsPage from "../pages/ChatsPage";
import HomePage from "../pages/Home/index";

export const router = [
  {
    path: "/",
    element: <App></App>,
    children: [
      /* { path: "/test", element: <SampleHome></SampleHome> }, */
      { path: "", element: <HomePage></HomePage> },
      {
        path: "auth-token-expiration",
        element: <AuthTokenExpiration></AuthTokenExpiration>,
      },
      {
        path: "login",
        element: <Login className=""></Login>,
      },
      {
        path: "register",
        element: <SignUp className=""></SignUp>,
      },
      {
        path: "toast-demo",
        element: <ToastDemo className=""></ToastDemo>,
      },
      {
        path: "demo-form",
        element: <DemoForm></DemoForm>,
      },
      {
        path: "profile/",
        element: <ProtectedRoute></ProtectedRoute>,
        children: [
          {
            path: "",
            element: <Profile className=""></Profile>,
          },
          {
            path: "edit",
            element: <EditProfile className=""></EditProfile>,
          },
        ],
      },
      {
        path: "chat",
        element: <ProtectedRoute></ProtectedRoute>,
        children: [
          {
            path: "",
            element: <ChatsPage className=""></ChatsPage>,
          },
        ],
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
      {
        path: "*",
        element: <ErrorPage></ErrorPage>,
      },
    ],
  },
];
