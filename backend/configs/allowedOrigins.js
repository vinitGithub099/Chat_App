import dotenv from "dotenv";
import express from "express";
const app = express();
dotenv.config();

export const allowedOrigins =
  app.settings.env === "development"
    ? [process.env.FRONTEND_DEV_URL1, process.env.FRONTEND_DEV_URL2]
    : [process.env.FRONTEND_PROD_URL];
