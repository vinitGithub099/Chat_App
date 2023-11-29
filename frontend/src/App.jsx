import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import _ from "underscore";
import { useToast } from "./components/Hooks/useToast";
import Loader from "./components/Loader";
import { WARNING } from "./constants/constants";
import "./index.css";
import { autoLogin } from "./store/Features/User/AuthActions";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const { loading } = useSelector((state) => state.auth);
  const { notify } = useToast();

  useEffect(() => {
    if (_.isEmpty(accessToken)) return;
    dispatch(autoLogin())
      .then()
      .catch(() => {
        notify("You are not logged in!", WARNING);
        navigate("/login");
      });
  }, [accessToken, dispatch, navigate, notify]);

  return (
    <main className="w-full min-h-screen">
      {loading ? <Loader></Loader> : <Outlet></Outlet>}
    </main>
  );
}
