import "dotenv/config";

const normalizeOrigins = (urls = []) =>
  urls.filter(Boolean).map((url) => url.trim().replace(/\/+$/, ""));

const isDev = process.env.NODE_ENV !== "production";

const rawOrigins = isDev
  ? [
      process.env.FRONTEND_DEV_URL1,
      process.env.FRONTEND_DEV_URL2,
      "http://localhost:5173",
      "http://localhost:3000",
    ]
  : [process.env.FRONTEND_PROD_URL];

export const allowedOrigins = normalizeOrigins(rawOrigins);
