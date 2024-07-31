import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Typography,
} from "@material-tailwind/react";
import cx from "classnames";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AVATAR_TYPE } from "../../constants/avatarType.js";
import { MENU_ITEMS, USER_MENU_ITEMS } from "../../constants/sideMenu.js";
import {
  BUTTON_VARIANT,
  TYPOGRAPHY_VARIANT,
} from "../../constants/variants.js";
import {
  setActitvityLabel,
  setContentLabel,
  toggleSidebar,
} from "../../store/Features/UI/uiSlice.js";
import AppAvatar from "../AppAvatar/index.jsx";
import classes from "./index.module.css";
import LogoutDialog from "./LogoutDialog/index.jsx";

const ChatSidebar = ({ className }) => {
  const { contentLabel } = useSelector((state) => state.ui.contentLabel);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(0);
  const navigate = useNavigate();

  const [openLogoutDailog, setOpenLogoutDailog] = useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleOpenLogoutDialog = () => setOpenLogoutDailog((prev) => !prev);

  const handleSidebar = (e) => {
    dispatch(toggleSidebar(e?.currentTarget?.value === "false"));
  };

  const handleClick = (e) => {
    const listItem = e.target.closest("div[data-key]");
    if (listItem) {
      const key = listItem.dataset.key;
      if (key === MENU_ITEMS.HOME.label) {
        navigate("/");
      } else if (
        key === MENU_ITEMS.CHATS.label ||
        key === MENU_ITEMS.STATUS.label
      ) {
        dispatch(setContentLabel(key));
        dispatch(setActitvityLabel(null));
      } else if (key === USER_MENU_ITEMS.LOGOUT.label) {
        handleOpenLogoutDialog();
      } else if (key === USER_MENU_ITEMS.PROFILE.label) {
        navigate("/profile");
      }
      dispatch(toggleSidebar());
    }
  };

  return (
    <div className={classes.chatSidebar} onClick={handleClick}>
      <Button
        variant={BUTTON_VARIANT.TEXT}
        className={classes.closeButton}
        onClick={handleSidebar}
        value={true}
      >
        <AiOutlineClose size={20} />
      </Button>
      <Accordion
        open={open === 1}
        icon={
          <FaChevronDown
            size={15}
            className={cx(classes.toggleIcon, {
              [classes.tranformIcon]: open == 1,
            })}
          />
        }
        className={classes.accordion}
      >
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className={classes.accordionHeader}
        >
          <div className={classes.headerItem}>
            <AppAvatar entity={user} size="sm" type={AVATAR_TYPE.USER} />
            <Typography variant={TYPOGRAPHY_VARIANT.H6}>
              {user?.name}
            </Typography>
          </div>
        </AccordionHeader>
        <AccordionBody className={classes.accordionBody}>
          {Object.values(USER_MENU_ITEMS).map(
            ({ label, icon: Icon }, index) => (
              <div
                key={index}
                className={cx(classes.userMenuItem, {
                  [classes.logout]: label === USER_MENU_ITEMS.LOGOUT.label,
                })}
                data-key={label}
              >
                <Icon size={15} />
                <Typography variant={TYPOGRAPHY_VARIANT.SMALL}>
                  {label}
                </Typography>
              </div>
            )
          )}
        </AccordionBody>
      </Accordion>
      <div className={cx(classes.menuList, className)}>
        {Object.values(MENU_ITEMS).map(({ label, icon: Icon }, index) => (
          <div
            key={index}
            className={cx(classes.menuLabel, {
              [classes.menuActive]: contentLabel === label,
            })}
            data-key={label}
          >
            <Icon size={20} />
            <Typography variant={TYPOGRAPHY_VARIANT.PARAGRAPH}>
              {label}
            </Typography>
          </div>
        ))}
      </div>
      <LogoutDialog
        openLogoutDailog={openLogoutDailog}
        handleOpenLogoutDialog={handleOpenLogoutDialog}
      />
    </div>
  );
};

export default ChatSidebar;
