import { Outlet } from "react-router-dom";
import "./index.css";

export default function App() {
  return (
    <main className="app">
      <Outlet></Outlet>
    </main>
  );
}
