import { FaUser } from "react-icons/fa";
import { FaCircleNotch } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineChat } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";

export const MENU_ITEMS = {
  CHATS: {
    label: "Chats",
    icon: MdOutlineChat,
  },
  STATUS: {
    label: "Status",
    icon: FaCircleNotch,
  },
  SETTINGS: {
    label: "Settings",
    icon: IoSettingsOutline,
  },
};

export const USER_MENU_ITEMS = {
  PROFILE: {
    label: "Profile",
    icon: FaUser,
  },
  LOGOUT: {
    label: "Logout",
    icon: RiLogoutCircleLine,
  }
}