import "dotenv/config";
import { auth } from "@lumira/auth";
// import { Hono } from "hono";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { handlePull, handlePush } from "./sync";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: process.env.CORS_ORIGIN || "",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

// WatermelonDB Sync Endpoint
app.get("/api/sync", handlePull);
app.post("/api/sync", handlePush);

app.get("/", (c) => {
  return c.text("OK");
});

export default app;
