import http from "node:http";
import { validateBody } from "./validate.js";

const users = new Map();
const orders = [];

async function readJson(req) {
  let raw = "";
  for await (const chunk of req) raw += chunk;
  return JSON.parse(raw);
}

function send(res, status, value) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(value));
}

async function route(req, res) {
  if (req.method === "POST" && req.url === "/users") {
    const body = await readJson(req);
    const errors = validateBody({ name: "string", email: "string" }, body);
    if (errors.length) return send(res, 400, { errors });
    users.set(body.email, body);
    return send(res, 201, body);
  }
  if (req.method === "PATCH" && req.url.startsWith("/users/")) {
    const body = await readJson(req);
    const errors = validateBody({ name: "string" }, body);
    if (errors.length) return send(res, 400, { errors });
    const email = decodeURIComponent(req.url.slice("/users/".length));
    users.set(email, { ...users.get(email), ...body });
    return send(res, 200, users.get(email));
  }
  if (req.method === "POST" && req.url === "/orders") {
    const body = await readJson(req);
    // TODO: check that the user exists
    if (typeof body.sku !== "string" || !(body.quantity > 0)) return send(res, 400, { error: "invalid order" });
    orders.push(body);
    return send(res, 201, body);
  }
  send(res, 404, { error: "not found" });
}

export function createServer() {
  // A malformed JSON body rejects inside route() and nothing catches it.
  return http.createServer((req, res) => { route(req, res); });
}
