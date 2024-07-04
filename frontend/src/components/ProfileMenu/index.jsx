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
import { useState } from "react";
import userLogo from "../../assets/profile-user_64572.png";
import classes from "./index.module.css";
import { menuItems } from "./menuItems";

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button variant="text" className={classes.avatarBtn}>
          <Avatar src={userLogo} alt="avatar" variant="rounded" size="sm" />
        </Button>
      </MenuHandler>
      <MenuList className={classes.menuList}>
        {menuItems.map(({ label, icon: Icon }, key) => {
          const isLastItem = key === menuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={cx(classes.menuItem, {
                [classes.lastMenuItem]: isLastItem,
              })}
            >
              <Icon
                className={cx(classes.icon, {
                  [classes.signOutText]: isLastItem,
                })}
              />
              <Typography
                as="span"
                variant="small"
                className={cx(classes.label, {
                  [classes.signOutText]: isLastItem,
                })}
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
