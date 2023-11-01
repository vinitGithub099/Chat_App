import { useContext } from "react";
import ToastContext from "../Toast/ToastContext";

export const useToast = () => useContext(ToastContext);
