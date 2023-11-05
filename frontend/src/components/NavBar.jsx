import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/Features/User/AuthSlice";
import Button from "./Form/Button";
export default function NavBar({ className }) {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  return (
    <div
      className={`w-full flex flex-row items-center justify-between px-8 py-4 shadow-sm shadow-light-2  ${className}`}
    >
      <div className="px-4 text-light-2 text-xl">
        {`Lets `}
        <span className="font-bold">Gossip!</span>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-row px-8">
          <nav className="text-light-1 px-4 py-2 ml-2 border-light-2 hover:text-light-2 hover:border-b-2 hover:cursor-pointer">
            <Link to="/chat">Chat</Link>
          </nav>
          <nav className="text-light-1 px-4 py-2 ml-2 border-light-2 hover:text-light-2 hover:border-b-2 hover:cursor-pointer">
            <Link to="/about">About</Link>
          </nav>
        </div>
        <Button
          className="border text-light-1 px-4 py-2 hover:border-light-2 hover:text-light-2 mx-2"
          type="submit"
          onClick={handleRegister}
          label="Sign up"
        ></Button>
        {token ? (
          <Button
            className="bg-light-2 bg-opacity-30 text-light-2 px-4 py-2 hover:text-light-1 ml-2 hover:border-light-2"
            type="submit"
            onClick={handleLogin}
            label="Login"
          ></Button>
        ) : (
          <Button
            className="bg-light-2 bg-opacity-30 text-light-2 px-4 py-2 hover:text-light-1 ml-2 hover:border-light-2"
            type="submit"
            onClick={handleLogout}
            label="Logout"
          ></Button>
        )}
      </div>
    </div>
  );
}
