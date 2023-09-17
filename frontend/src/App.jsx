import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import _ from "underscore";
import "./index.css";
import { router } from "./routes/AppRoutes";
import { authorize } from "./store/Features/AuthSlice";

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!_.isEmpty(token)) {
      authorize({ payload: { authorized: true } });
    }
  });
  return (
    <main className="w-full min-h-screen">
      <RouterProvider router={createBrowserRouter(router)}></RouterProvider>
    </main>
  );
}
