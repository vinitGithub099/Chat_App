import { io } from "socket.io-client";
import { BASE_URL } from "../../constants/constants";
export const socket = io(BASE_URL);
