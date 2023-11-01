import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ToastProvider from "./components/Toast/ToastProvider";
import "./index.css";
import { router } from "./routes/AppRoutes";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <RouterProvider router={createBrowserRouter(router)}></RouterProvider>
      </ToastProvider>
    </Provider>
  </React.StrictMode>
);
