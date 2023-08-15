import axios from "axios";

const baseUrl = "http://localhost:5000";

export const api = axios.create({
  baseURL: baseUrl,
});
