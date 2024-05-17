/* backend API base url */
const BASE_URL = import.meta.env.PROD
  ? "https://chat-app-backend-f9vy.onrender.com"
  : "http://localhost:5000";


export { BASE_URL };
