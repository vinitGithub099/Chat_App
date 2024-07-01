import { List, ListItem } from "@material-tailwind/react";
import cx from "classnames";
import classes from "./index.module.css";
import { navList } from "./navList";

const Navlist = ({ className }) => {
  return (
    <List className={cx(classes.navList, className)}>
      {navList?.length
        ? navList.map((navItem, index) => (
            <ListItem key={index} className={classes.navListItem}>
              {navItem.name}
            </ListItem>
          ))
        : null}
    </List>
  );
};

export default Navlist;
