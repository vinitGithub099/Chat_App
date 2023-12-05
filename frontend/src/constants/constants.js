/* toast */
const SUCCESS = "success";
const WARNING = "warn";
const ERROR = "error";
const INFO = "info";
const BASE_URL = import.meta.env.PROD
  ? "https://chat-app-backend-f9vy.onrender.com"
  : "http://localhost:5000";

const channelOptions = {
  INFO: "Info",
  EXIT_GROUP: "Exit Group",
};

const PERSIST_AUTH_KEY = "persist:auth";

export {
  BASE_URL,
  ERROR,
  INFO,
  PERSIST_AUTH_KEY,
  SUCCESS,
  WARNING,
  channelOptions,
};
