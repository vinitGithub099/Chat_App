import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import _ from "underscore";
import SampleHome from "./SampleHome";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Login from "./components/LoginSignUp/Login";
import SignUp from "./components/LoginSignUp/SignUp";
import Profile from "./components/Profile";
import "./index.css";
import { authorize } from "./store/Features/AuthSlice";

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!_.isEmpty(token)) {
      authorize({ payload: { authorized: true } });
    }
  });
  return (
    <main className="w-full min-h-screen">
      {/* <Login className=""></Login> */}
      {/* <SignUp className="mx-auto"></SignUp> */}
      <Routes>
        <Route path="/" element={<SampleHome></SampleHome>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<SignUp></SignUp>}></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile></Profile>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </main>
  );
}
