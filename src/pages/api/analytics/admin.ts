import type { APIRoute } from "astro";
import { SESSION_COOKIE } from "../../../lib/session";
import { getCurrentUser, userIsAdmin } from "../../../lib/auth";
import { getAdminAnalytics, getUserDailySignups, getRecentActivity } from "../../../lib/analytics";

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);

  if (!user || !userIsAdmin(user)) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const [analytics, signups, activity] = await Promise.all([
    getAdminAnalytics(),
    getUserDailySignups(),
    getRecentActivity(),
  ]);

  return new Response(JSON.stringify({ analytics, signups, activity }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
