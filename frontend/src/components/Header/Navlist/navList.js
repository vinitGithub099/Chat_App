import { AiFillHome } from "react-icons/ai";
import { FaCircleInfo, FaMessage } from "react-icons/fa6";
import styles from "./index.module.css";
export const navList = [
  {
    path: "/",
    name: "Home",
    className: styles.listItem,
    icon: AiFillHome,
  },
  {
    path: "/chat",
    name: "Chat",
    className: styles.listItem,
    icon: FaMessage,
  },
  {
    path: "/about",
    name: "About",
    className: styles.listItem,
    icon: FaCircleInfo,
  },
];
