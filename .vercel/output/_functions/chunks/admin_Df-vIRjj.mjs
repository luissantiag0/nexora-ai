import { S as SESSION_COOKIE } from './session_-AL8X7ha.mjs';
import { getCurrentUser, userIsAdmin } from './auth_DO-wdbiw.mjs';
import { g as getAdminAnalytics, a as getUserDailySignups, b as getRecentActivity } from './analytics_B7BaGVOn.mjs';

const prerender = false;
const GET = async ({ cookies }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user || !userIsAdmin(user)) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 403,
      headers: { "Content-Type": "application/json" }
    });
  }
  const [analytics, signups, activity] = await Promise.all([
    getAdminAnalytics(),
    getUserDailySignups(),
    getRecentActivity()
  ]);
  return new Response(JSON.stringify({ analytics, signups, activity }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
