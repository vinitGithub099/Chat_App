import { useState } from "react";
import _ from "underscore";
import Toast from "./Toast";
import ToastContext from "./ToastContext";

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const populateToast = (content, type, hideIcon) =>
    setToasts((currToasts) => [
      ...currToasts,
      { id: _.uniqueId(""), content, type, hideIcon },
    ]);

  const closeToast = (id) => {
    setToasts((currToast) => currToast.filter((toast) => toast.id != id));
  };

  const notify = (content, type, hideIcon) =>
    populateToast(content, type, hideIcon);

  return (
    <ToastContext.Provider value={{ notify }}>
      <div className="fixed right-0 flex flex-col-reverse items-end justify-center bg-transparent z-50">
        {toasts && toasts.length
          ? toasts.map((toast) => (
              <Toast
                key={toast.id}
                content={toast.content}
                type={toast.type}
                closeToast={() => closeToast(toast.id)}
                className="my-2 text-light-1 px-4 py-2 rounded-md"
                hideIcon={toast.hideIcon}
              ></Toast>
            ))
          : null}
      </div>
      {children}
    </ToastContext.Provider>
  );
}
