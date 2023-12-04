/* toast */
const SUCCESS = "success";
const WARNING = "warn";
const ERROR = "error";
const INFO = "info";
const BASE_URL = import.meta.env.PROD
  ? "https://chat-app-backend-f9vy.onrender.com/api"
  : "http://localhost:5000/api";

const channelOptions = {
  INFO: "Info",
  EXIT_GROUP: "Exit Group",
};
export { BASE_URL, ERROR, INFO, SUCCESS, WARNING, channelOptions };
