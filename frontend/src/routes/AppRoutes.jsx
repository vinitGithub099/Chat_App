import App from "../App";
import LoginPage from "../pages/Auth/Login";
import RegisterPage from "../pages/Auth/Register";
import Chats from "../pages/Chats";
import ErrorPage from "../pages/Error";
import HomePage from "../pages/Home/index";
import Profile from "../pages/Profile";
import Notification from "../pages/Sample/Notification";
import DevRoutes from "./DevRoute";
import ProtectedRoute from "./ProtectedRoute";

export const router = [
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "sample/",
        element: <DevRoutes></DevRoutes>,
        children: [
          {
            path: "toasts",
            element: <Notification></Notification>,
          },
        ],
      },
      {
        path: "profile/",
        element: <ProtectedRoute></ProtectedRoute>,
        children: [
          {
            path: "",
            element: <Profile className="" />,
          },
        ],
      },
      {
        path: "chat",
        element: <ProtectedRoute></ProtectedRoute>,
        children: [
          {
            path: "",
            element: <Chats className="" />,
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
];
