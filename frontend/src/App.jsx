import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import _ from "underscore";
import Loader from "./components/Loader";
import "./index.css";
import { autoLogin } from "./store/Features/User/AuthActions";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (_.isEmpty(accessToken)) return;
    dispatch(autoLogin())
      .then()
      .catch(() => {
        navigate("/intermediate-loader", {
          state: { message: "Redirecting to Login" },
        });
      });
  }, [accessToken, dispatch, navigate]);

  return (
    <main className="w-full min-h-screen">
      {loading ? <Loader></Loader> : <Outlet></Outlet>}
    </main>
  );
}
