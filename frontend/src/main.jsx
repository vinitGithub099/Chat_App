import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { router } from "./routes/AppRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={createBrowserRouter(router)}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
