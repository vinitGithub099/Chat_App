import {
  Avatar,
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
import { TYPOGRAPHY_VARIANT } from "../../constants/variants";

const Dropdown = ({ menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const renderMenuList = () =>
    menuItems?.length
      ? menuItems.map(({ label, icon: Icon }, key) => {
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
                variant={TYPOGRAPHY_VARIANT.SMALL}
                className={cx(classes.label, {
                  [classes.signOutText]: isLastItem,
                })}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })
      : null;

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Avatar
          src={userLogo}
          alt="avatar"
          variant="rounded"
          size="sm"
          className={classes.avatarBtn}
        />
      </MenuHandler>
      <MenuList className={classes.menuList}>{renderMenuList()}</MenuList>
    </Menu>
  );
};

export default Dropdown;
