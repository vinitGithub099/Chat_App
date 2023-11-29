import { Link } from "react-router-dom";
import ListComponent from "./components/ListComponent";

const list = [
  {
    path: "/home",
    text: "home",
  },
  {
    path: "/login",
    text: "login",
  },
  {
    path: "/toast-demo",
    text: "toastDemo",
  },
  {
    path: "/register",
    text: "register",
  },
  {
    path: "/profile",
    text: "profile",
  },
  {
    path: "/chat",
    text: "chat",
  },
  {
    path: "/message-card",
    text: "Message Card",
  },
  {
    path: "/user-avatar",
    text: "User Avatar",
  },
  {
    path: "/user-card",
    text: "User Card",
  },
  {
    path: "/demo-form",
    text: "demo form",
  },
];

export default function SampleHome() {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-dark-3">
      <h3 className="p-4 text-2xl font-bold text-light-2">Sample Components</h3>
      <ListComponent list={list} subComponent={SubComponent}></ListComponent>
    </div>
  );
}

function SubComponent({ path, text }) {
  return (
    <div className="underline p-2 text-light-1">
      <Link to={path}>{text}</Link>
    </div>
  );
}
