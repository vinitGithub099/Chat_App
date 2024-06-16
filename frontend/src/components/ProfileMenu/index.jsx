import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import cx from "classnames";
import { createElement, useState } from "react";
import userLogo from "../../assets/profile-user_64572.png";
import classes from "./index.module.css";
import { menuItems } from "./menuItems";

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button variant="text" color="blue-gray" className={classes.avatarBtn}>
          <Avatar src={userLogo} alt="avatar" variant="rounded" size="sm" />
        </Button>
      </MenuHandler>
      <MenuList className={classes.menuList}>
        {menuItems.map(({ label, icon }, key) => {
          const isLastItem = key === menuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={cx(classes.menuItem, {
                [classes.lastMenuItem]: isLastItem,
              })}
            >
              {createElement(icon, {
                className: cx(classes.icon, {
                  [classes.signOutText]: isLastItem,
                }),
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className={classes.label}
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
