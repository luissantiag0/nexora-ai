import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
  const start = Date.now();
  const status = { status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString(), version: "1.0.0" };
  return new Response(JSON.stringify(status), { status: 200, headers: { "Content-Type": "application/json", "X-Response-Time": `${Date.now() - start}ms` } });
};
