import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./index.css";
const message = "Verifying Credentials";

export default function App() {
  const loading = useSelector((state) => state.auth.loading);

  return (
    <main className="w-full min-h-screen">
      {loading.autLogin ? <div>{message}</div> : <Outlet></Outlet>}
    </main>
  );
}
