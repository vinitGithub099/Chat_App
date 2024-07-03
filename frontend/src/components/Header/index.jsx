import { Button, Collapse, Navbar } from "@material-tailwind/react";
import cx from "classnames";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo";
import Navlist from "../Navlist";
import ProfileMenu from "../ProfileMenu";
import classes from "./index.module.css";

const Header = ({ className }) => {
  const [openNav, setOpenNav] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleClick = (e) => {
    navigate(`/${e.target.name}`);
  };

  const toggleNavbar = () => setOpenNav((prev) => !prev);

  const authButtons = (isFullWidth) => {
    return (
      <div
        className={
          isFullWidth ? classes.btnContainerCollapse : classes.btnContainer
        }
      >
        <Button
          name="register"
          size="sm"
          variant="text"
          fullWidth={isFullWidth}
          onClick={handleClick}
          className={classes.registerBtn}
        >
          Sign Up
        </Button>
        {!isLoggedIn ? (
          <ProfileMenu />
        ) : (
          <Button
            name="login"
            variant="text"
            size="sm"
            fullWidth={isFullWidth}
            onClick={handleClick}
            className={classes.loginBtn}
          >
            Log In
          </Button>
        )}
      </div>
    );
  };

  return (
    <header className={cx(classes.header, className)}>
      <Navbar className={classes.navbar}>
        <div className={classes.navbarContainer}>
          <Logo size="sm" className={classes.logo} />
          <Navlist className={classes.navlist} />
          {authButtons(false)}
          <Button
            variant="text"
            className={classes.toggleNavBtn}
            onClick={toggleNavbar}
          >
            {openNav ? (
              <AiOutlineClose size={20} />
            ) : (
              <AiOutlineMenu size={20} />
            )}
          </Button>
        </div>
        <Collapse open={openNav}>
          <Navlist />
          {authButtons(true)}
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
