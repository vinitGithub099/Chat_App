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
import { useNavigate } from "react-router-dom";
import { AUTH_NOTIFICATION_ACTION } from "../../../constants/authNotficationTypes";
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
import { profileMenuItems as menuItems } from "../profileMenuItems";
import classes from "./index.module.css";

const Dropdown = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();

  const closeMenu = () => setIsMenuOpen(false);

  const handleClick = (e) => {
    const listItem = e.target.closest("button[value]");
    if (listItem?.value === menuItems.SIGN_OUT.label) {
      dispatch(logout());
      notify(
        {
          toastType: NOTIFICATION_TYPE.AUTH,
          status: NOTIFICATION_STATUS.SUCCESS,
          action: AUTH_NOTIFICATION_ACTION.LOGOUT,
        },
        { position: "top-right" }
      );
    } else if (listItem?.value === menuItems.PROFILE.label) {
      navigate("/profile")
    }
  };

  const renderMenuList = () =>
    Object.values(menuItems)?.length
      ? Object.values(menuItems).map(({ label, icon: Icon }, index) => {
          const isLastItem = index === Object.keys(menuItems).length - 1;
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
