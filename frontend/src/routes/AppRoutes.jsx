import App from "../App";
import LoginPage from "../pages/Auth/Login";
import RegisterPage from "../pages/Auth/Register";
import Chats from "../pages/Chats";
import ErrorPage from "../pages/Error";
import HomePage from "../pages/Home/index";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoutes";

export const router = [
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "login",
        element: <LoginPage />,
        // element: <></>,
      },
      {
        path: "register",
        element: <RegisterPage />,
        // element: <></>,
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
        // element: <ProtectedRoute></ProtectedRoute>,
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
