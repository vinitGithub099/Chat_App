import { List, ListItem, Typography } from "@material-tailwind/react";
import cx from "classnames";
import classes from "./index.module.css";
import { navList } from "./navList";

const Navlist = ({ className }) => {
  return (
    <List className={cx(classes.navList, className)}>
      {navList?.length
        ? navList.map((navItem, index) => (
            <Typography
              key={index}
              as="a"
              href="#"
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              <ListItem className={classes.navListItem}>
                {navItem.name}
              </ListItem>
            </Typography>
          ))
        : null}
    </List>
  );
};

export default Navlist;
