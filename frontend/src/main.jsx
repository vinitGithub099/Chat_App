import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import SocketClient from "./SocketClient";
import ToastProvider from "./components/Toast/ToastProvider";
import "./index.css";
import { router } from "./routes/AppRoutes";
import { store } from "./store/store";

export const socketClient = new SocketClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistStore(store)}>
      <ToastProvider>
        <RouterProvider router={createBrowserRouter(router)}></RouterProvider>
      </ToastProvider>
    </PersistGate>
  </Provider>
);
