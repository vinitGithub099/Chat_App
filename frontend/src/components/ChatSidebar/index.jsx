import { Button, List, ListItem } from "@material-tailwind/react";
import cx from "classnames";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "../../constants/sideMenu.js";
import {
  setActitvityLabel,
  setContentLabel,
  toggleSidebar,
} from "../../store/Features/UI/UISlice.js";
import classes from "./index.module.css";

const ChatSidebar = ({ className }) => {
  const { contentLabel } = useSelector((state) => state.ui.contentLabel);
  const dispatch = useDispatch();

  const handleSidebar = (e) => {
    dispatch(toggleSidebar(e?.currentTarget?.value === "false"));
  };

  const handleClick = (e) => {
    const listItem = e.target.closest("div[data-key]");
    if (listItem) {
      const key = listItem.dataset.key;
      dispatch(setContentLabel(key));
      dispatch(setActitvityLabel(null));
      dispatch(toggleSidebar(false));
    }
  };

  return (
    <div className={classes.chatSidebar}>
      <Button
        variant="text"
        className={classes.closeButton}
        onClick={handleSidebar}
        value={true}
      >
        <AiOutlineClose size={20} />
      </Button>
      <List className={cx(classes.menuList, className)} onClick={handleClick}>
        {Object.values(MENU_ITEMS).map(({ label, icon: Icon }, index) => (
          <ListItem
            key={index}
            className={cx(classes.menuLabel, {
              [classes.menuActive]: contentLabel === label,
            })}
            data-key={label}
          >
            <Icon size={20} />
            <p>{label}</p>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ChatSidebar;
