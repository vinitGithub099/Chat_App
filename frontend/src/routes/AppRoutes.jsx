import ProtectedRoute from "../components/Auth/ProtectedRoute";
import Login from "../components/LoginSignUp/Login";
import SignUp from "../components/LoginSignUp/SignUp";
import EditProfile from "../components/Profile/EditProfile";
import Profile from "../components/Profile/Profile";
import SampleHome from "../SampleHome";
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
    ],
  },
];
