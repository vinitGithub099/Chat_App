import { Outlet } from "react-router-dom";
import "./index.css";

export default function App() {
  return (
    <main className="w-full min-h-screen">
      <Outlet></Outlet>
    </main>
  );
}
