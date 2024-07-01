import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./index.css";
const message = "Verifying Credentials";

export default function App() {
  const loading = useSelector((state) => state.auth.loading);

  return (
    <main className="app">
      {loading.autLogin ? <div>{message}</div> : <Outlet></Outlet>}
    </main>
  );
}
