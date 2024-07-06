import express from "express";
const app = express();

export const allowedOrigins =
  app.settings.env === "development"
    ? [process.env.FRONTEND_DEV_URL]
    : [process.env.FRONTEND_PROD_URL];
