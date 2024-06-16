import { Button, Collapse, IconButton, Navbar } from "@material-tailwind/react";
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

  const authButtons = (isFullWidth) => {
    return (
      <div
        className={
          isFullWidth ? classes.btnContainerCollapse : classes.btnContainer
        }
      >
        <Button
          name="register"
          variant="gradient"
          size="sm"
          fullWidth={isFullWidth}
          onClick={handleClick}
        >
          Sign Up
        </Button>
        {isLoggedIn ? (
          <ProfileMenu />
        ) : (
          <Button
            name="login"
            variant="text"
            size="sm"
            color="blue-gray"
            fullWidth={isFullWidth}
            onClick={handleClick}
          >
            Log In
          </Button>
        )}
      </div>
    );
  };

  const iconButton = (
    <IconButton
      variant="text"
      color="blue-gray"
      className={classes.iconButton}
      onClick={() => setOpenNav(!openNav)}
    >
      {openNav ? (
        <AiOutlineClose className={classes.icon} size={20} />
      ) : (
        <AiOutlineMenu className={classes.icon} size={20} />
      )}
    </IconButton>
  );

  return (
    <header className={cx(classes.header, className)}>
      <Navbar className={classes.navbar}>
        <div className={classes.navbarContainer}>
          <Logo size="sm" />
          <Navlist className={classes.navlist} />
          {authButtons(false)}
          {iconButton}
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
