import { useContext } from "react";
import ToastContext from "../context/Toast";

export const useToast = () => useContext(ToastContext);
