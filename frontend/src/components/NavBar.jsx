import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PERSIST_AUTH_KEY } from "../constants/constants";
import { logout } from "../store/Features/User/AuthSlice";
import Button from "./Form/Button";

export default function NavBar({ className }) {
  const [navbar, setNavbar] = useState(false);
  const { token, tokenExpired, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem(PERSIST_AUTH_KEY);
    dispatch(logout());
  };
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  const handleNavbar = () => setNavbar((prev) => !prev);

  return (
    <div
      className={`w-full flex flex-col sm:flex-row items-center justify-between sm:px-8 sm:py-4 sm:shadow-sm sm:shadow-light-2  ${className}`}
    >
      {/*  */}
      <div className="max-sm:w-full max-sm:py-4 py-2 px-4 text-light-2 text-xl flex items-start gap-8 max-sm:shadow-sm max-sm:shadow-light-2">
        <div
          className="sm:hidden hover:bg-light-3 hover:bg-opacity-50 hover:cursor-pointer"
          onClick={handleNavbar}
        >
          {!navbar ? (
            <AiOutlineMenu size={30}></AiOutlineMenu>
          ) : (
            <AiOutlineClose size={30}></AiOutlineClose>
          )}
        </div>
        <div className="">
          <span className="italic">{`Lets `}</span>
          <span className="font-bold">Gossip!</span>
        </div>
      </div>

      {/* desktop view */}
      <div className="max-sm:hidden flex px-8 flex-row items-center gap-4">
        <div className="flex flex-row items-center gap-4 mr-8">
          <Link to="/chat">
            <nav className="text-light-2 px-4 py-2 border-2 border-dark-3 hover:border-b-light-2 hover:text-light-1 hover:border-b-2">
              Chat
            </nav>
          </Link>
          <Link to="/about">
            <nav className="text-light-2 px-4 py-2 border-2 border-dark-3 hover:border-b-light-2 hover:text-light-1 hover:border-b-2">
              About
            </nav>
          </Link>
        </div>

        <Button
          className="border border-light-2 text-light-2 px-4 py-2 hover:border-light-1 hover:text-light-1"
          type="submit"
          handleClick={handleRegister}
          label="Sign up"
        ></Button>
        {user && token && !tokenExpired ? (
          <Button
            className="bg-light-2 bg-opacity-30 text-light-1 px-4 py-2 hover:bg-opacity-20"
            type="submit"
            handleClick={handleLogout}
            label="Logout"
          ></Button>
        ) : (
          <Button
            className="bg-light-2 bg-opacity-30 text-light-1 px-4 py-2 hover:text-light-2"
            type="submit"
            handleClick={handleLogin}
            label="Login"
          ></Button>
        )}
      </div>

      {/* mobile view */}
      {navbar && (
        <div
          className={`sm:hidden flex flex-col gap-4 px-8 py-4 w-full fixed top-20 border border-light-3 rounded-lg`}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/chat">
              <nav className="text-light-2 px-4 py-2 border-2 border-dark-3 hover:border-b-light-2 hover:text-light-1 hover:border-b-2">
                Chat
              </nav>
            </Link>
            <Link to="/about">
              <nav className="text-light-2 px-4 py-2 border-2 border-dark-3 hover:border-b-light-2 hover:text-light-1 hover:border-b-2">
                About
              </nav>
            </Link>
          </div>

          <Button
            className="border border-light-2 text-light-2 px-4 py-2 hover:border-light-1 hover:text-light-1"
            type="submit"
            handleClick={handleRegister}
            label="Sign up"
          ></Button>
          {user && token && !tokenExpired ? (
            <Button
              className="bg-light-2 bg-opacity-30 text-light-1 px-4 py-2 hover:bg-opacity-20"
              type="submit"
              handleClick={handleLogout}
              label="Logout"
            ></Button>
          ) : (
            <Button
              className="bg-light-2 bg-opacity-30 text-light-1 px-4 py-2 hover:text-light-2"
              type="submit"
              handleClick={handleLogin}
              label="Login"
            ></Button>
          )}
        </div>
      )}
    </div>
  );
}
