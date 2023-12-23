import { io } from "socket.io-client";
const URL = import.meta.env.PROD
  ? "https://jscafe-sketchbook-server.onrender.com"
  : "http://localhost:5000";
export const socket = io(URL);
