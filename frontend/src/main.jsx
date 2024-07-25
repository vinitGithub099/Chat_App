import { ThemeProvider } from "@material-tailwind/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { router } from "./routes/AppRoutes";
import store from "./store/store";
import { socket } from "./utils/socket";

export const chatSocket = socket;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistStore(store)}>
      <ThemeProvider>
        <RouterProvider router={createBrowserRouter(router)}></RouterProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
