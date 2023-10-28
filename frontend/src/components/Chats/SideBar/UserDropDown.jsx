import { BiSolidUserCircle } from "react-icons/bi";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import ListComponent from "../../ListComponent";

export default function UserDropDown() {
  return (
    <ListComponent
      list={userDropDownList}
      className="w-dropdown bg-dark-1 p-4 rounded-md absolute bottom-20"
      subComponent={SubComponent}
    ></ListComponent>
  );
}

function SubComponent({ label, path, icon, fontClass }) {
  const navigate = useNavigate();
  const handelClick = () => navigate(path);
  return (
    <div
      className={`w-full mb-2 p-2 flex flex-row items-center gap-2 rounded-md hover:bg-light-3 ${fontClass}`}
    >
      <div>{icon}</div>
      <p className="text-md text-left font-semibold" onClick={handelClick}>
        {label}
      </p>
    </div>
  );
}

const userDropDownList = [
  {
    label: "Profile",
    path: "/profile",
    icon: <BiSolidUserCircle size={20}></BiSolidUserCircle>,
    fontClass: "text-light-2",
  },
  {
    label: "Sign Out",
    path: "/login",
    icon: <PiSignOutBold size={20}></PiSignOutBold>,
    fontClass: "text-warning",
  },
];
