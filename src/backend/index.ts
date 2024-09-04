import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from 'hono/cors'
import pdf from "./pfdMerger";

const app = new Hono().basePath("/api");

app.use(cors())
app.use(logger());

app.get("/", async (c) => {
  return c.json({ message: "Hello from Hono!" });
});

app.route("/pdf", pdf);

Bun.serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("From bun");
