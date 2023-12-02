import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import _ from "underscore";
import { useToast } from "./components/Hooks/useToast";
import Loader from "./components/Loader";
import { WARNING } from "./constants/constants";
import "./index.css";
import { socketClient } from "./main";
import { autoLogin } from "./store/Features/User/AuthActions";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { notify } = useToast();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (_.isEmpty(accessToken)) return;
    dispatch(autoLogin())
      .then()
      .catch(() => {
        notify("You are not logged in!", WARNING);
        navigate("/login");
      });
  }, [dispatch]);

  useEffect(() => {
    const connectChatSocket = async (user) =>
      socketClient && (await socketClient.connect(user));

    if (user) {
      connectChatSocket(user);
    }
    
  }, [user]);

  return (
    <main className="w-full min-h-screen">
      {loading ? <Loader></Loader> : <Outlet></Outlet>}
    </main>
  );
}
