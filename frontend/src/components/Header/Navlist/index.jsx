import { Typography } from "@material-tailwind/react";
import cx from "classnames";
import { Link } from "react-router-dom";
import classes from "./index.module.css";
import { navList } from "./navList";
import { TYPOGRAPHY_VARIANT } from "../../../constants/variants";
import { prefetchRoute } from "../../../helpers/helpers";

const Navlist = ({ className }) => {
  const handleHover = (key) => {
      prefetchRoute(key);
  }
  return (
    <ul className={cx(classes.navList, className)}>
      {navList?.length
        ? navList.map(({ name, icon: Icon, path }, index) => (
            <Link key={index} to={path} onMouseEnter={() => handleHover(name?.toLowerCase())}>
              <li className={classes.navListItem}>
                <Icon fontSize={16} />
                <Typography variant={TYPOGRAPHY_VARIANT.SMALL}>{name}</Typography>
              </li>
            </Link>
          ))
        : null}
    </ul>
  );
};

export default Navlist;
