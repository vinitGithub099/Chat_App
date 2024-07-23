import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography
} from "@material-tailwind/react";
import cx from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "../../constants/variants";
import AppAvatar from "../AppAvatar";
import classes from "./index.module.css";
import { AVATAR_TYPE } from "../../constants/avatarType";

const Dropdown = ({ menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(state => state.auth.user);

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
        <Button variant={BUTTON_VARIANT.TEXT} className="p-0" ripple={false}>
        <AppAvatar
          entity={user}
          size="sm"
          type={AVATAR_TYPE.USER}
        />
        </Button>
      </MenuHandler>
      <MenuList className={classes.menuList}>{renderMenuList()}</MenuList>
    </Menu>
  );
};

export default Dropdown;
