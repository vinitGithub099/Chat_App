import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { navList } from "./navList";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {navList.map(({ text, path, className }, idx) => (
          <li key={idx} className={className}>
            <Link to={path}>{text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
