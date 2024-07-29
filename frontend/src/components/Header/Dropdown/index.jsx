import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import cx from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AUTH_NOTIFICATION_ACTION,
} from "../../../constants/authNotficationTypes";
import { AVATAR_TYPE } from "../../../constants/avatarType";
import { NOTIFICATION_STATUS } from "../../../constants/notificationStatus";
import { NOTIFICATION_TYPE } from "../../../constants/notificationType";
import {
  BUTTON_VARIANT,
  TYPOGRAPHY_VARIANT,
} from "../../../constants/variants";
import useNotification from "../../../hooks/useNotification";
import { logout } from "../../../store/Features/Auth/authSlice";
import AppAvatar from "../../AppAvatar";
import classes from "./index.module.css";

const Dropdown = ({ menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { notify } = useNotification();

  const closeMenu = () => setIsMenuOpen(false);

  const handleClick = (e) => {
    const listItem = e.target.closest("button[value]");
    if (listItem?.value === "Sign Out") {
      console.log("notified");
      dispatch(logout());
      notify(
        {
          toastType: NOTIFICATION_TYPE.AUTH,
          status: NOTIFICATION_STATUS.SUCCESS,
          action: AUTH_NOTIFICATION_ACTION.LOGOUT,
        },
        { position: "top-right" }
      );
    }
  };

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
              value={label}
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
          <AppAvatar entity={user} size="sm" type={AVATAR_TYPE.USER} />
        </Button>
      </MenuHandler>
      <MenuList className={classes.menuList} onClick={handleClick}>
        {renderMenuList()}
      </MenuList>
    </Menu>
  );
};

export default Dropdown;
