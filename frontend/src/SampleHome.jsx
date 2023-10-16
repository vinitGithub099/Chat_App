import { Link } from "react-router-dom";

const list = [
  {
    path: "/login",
    text: "login",
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
];

export default function SampleHome() {
  return (
    <div className="w-full mt-4 flex flex-col items-center">
      <h3 className="text-2xl font-bold">Sample Components</h3>
      {list && list.length
        ? list.map(({ path, text }, index) => (
            <div key={index} className="underline p-2">
              <Link to={path}>{text}</Link>
            </div>
          ))
        : null}
    </div>
  );
}
