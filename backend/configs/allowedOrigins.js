const express = require("express");
const app = express();

const allowedOrigins =
  app.settings.env === "development"
    ? ["http://127.0.0.1:5173", "http://localhost:5173"]
    : ["https://chat-app-black-six.vercel.app"];
module.exports = { allowedOrigins };
