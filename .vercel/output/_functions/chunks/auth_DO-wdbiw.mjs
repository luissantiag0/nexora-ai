import { timingSafeEqual, createHmac } from 'node:crypto';
import { compare, hash } from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { p as prisma } from './prisma_JAVnBMvn.mjs';
import { Resend } from 'resend';
import { A as ADMIN_SESSION_DURATION_MS, g as generateSessionToken } from './session_-AL8X7ha.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_STRIPE_PUBLISHABLE_KEY": "pk_test_51TWFwrD2Tmjjrm5f8ExJMoB2c4rRuAYYJ3vQRMqehcl7DD2aI52ebP2fxBxbWyp64nCNlN9VBxp2AvBpHINMkxvs00K1zX1o1C", "SITE": undefined, "SSR": true};
const readEnv = (key) => {
  const fromProcess = typeof process !== "undefined" ? process.env?.[key] : void 0;
  const fromMeta = Object.assign(__vite_import_meta_env__, { RESEND_API_KEY: "re_iPuUuquD_E2hjDnyrimLAvuuX8G3m1tQc", LEAD_FROM_EMAIL: "onboarding@resend.dev", PUBLIC: "C:\\Users\\Public" })[key] ?? void 0;
  return (fromProcess ?? fromMeta ?? "").trim();
};
const getFromEmail = () => readEnv("LEAD_FROM_EMAIL") || "onboarding@resend.dev";
function getResend() {
  const key = readEnv("RESEND_API_KEY");
  if (!key) return null;
  return new Resend(key);
}
function buildHtml(body) {
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;padding:24px;max-width:600px;margin:0 auto">
    <div style="border-bottom:2px solid #22d3ee;padding-bottom:16px;margin-bottom:24px">
      <h1 style="margin:0;font-size:20px;color:#07070A">NexoraAI</h1>
    </div>
    ${body}
    <div style="border-top:1px solid #e5e7eb;margin-top:24px;padding-top:16px;font-size:12px;color:#6b7280">
      <p>NexoraAI — Automatización con IA</p>
    </div>
  </body></html>`;
}
async function sendEmail(to, subject, body) {
  const resend = getResend();
  if (!resend) {
    console.warn("[email] RESEND_API_KEY no configurada. Email omitido.");
    return false;
  }
  try {
    const { error } = await resend.emails.send({
      from: getFromEmail(),
      to: [to],
      subject,
      html: buildHtml(body),
      text: body.replace(/<[^>]*>/g, "")
    });
    if (error) {
      console.error("[email] Error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] Error enviando:", err);
    return false;
  }
}
async function sendWelcomeEmail(email, name) {
  return sendEmail(
    email,
    "Bienvenido a NexoraAI",
    `<h2>¡Bienvenido a NexoraAI, ${name}!</h2>
     <p>Tu cuenta ha sido creada exitosamente.</p>
     <p>Hemos activado automáticamente tu <strong>prueba gratuita de 30 minutos</strong> para que puedas explorar todas las funcionalidades premium.</p>
     <p>Durante este periodo tendrás acceso completo a:</p>
     <ul>
       <li>CRM con gestión de leads</li>
       <li>Dashboard de métricas</li>
       <li>Panel premium completo</li>
     </ul>
     <p style="margin-top:20px">
       <a href="${readEnv("PUBLIC_APP_URL") || "http://localhost:4321"}/dashboard"
          style="display:inline-block;background:#22d3ee;color:#000;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
         Ir al dashboard
       </a>
     </p>
     <p style="margin-top:16px;font-size:13px;color:#6b7280">
       ¿Preguntas? Escríbenos a <a href="mailto:soporte@nexora.ai">soporte@nexora.ai</a>
     </p>`
  );
}

const USER_COLUMN_CACHE_MS = 3e4;
let userColumnSupportCache;
const baseUserSelect = {
  id: true,
  email: true,
  passwordHash: true,
  role: true,
  createdAt: true
};
const missingColumnFallback = {
  adminSessionToken: false,
  adminSessionStartedAt: false,
  isPremium: false,
  premiumSince: false,
  subscriptionStatus: false,
  subscriptionCurrentPeriodEnd: false,
  name: false,
  trialStartedAt: false,
  trialEndsAt: false
};
const resetUserColumnSupportCache = () => {
  userColumnSupportCache = void 0;
};
const isMissingColumnError = (error) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2022") {
    return true;
  }
  return String(error).includes("does not exist");
};
const getUserColumnSupport = async () => {
  const now = Date.now();
  if (userColumnSupportCache && now - userColumnSupportCache.checkedAt < USER_COLUMN_CACHE_MS) {
    return userColumnSupportCache.value;
  }
  try {
    const rows = await prisma.$queryRaw`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'User'
          AND column_name IN (
            'adminSessionToken',
            'adminSessionStartedAt',
            'isPremium',
            'premiumSince',
            'subscriptionStatus',
            'subscriptionCurrentPeriodEnd',
            'name',
            'trialStartedAt',
            'trialEndsAt'
          )
      `;
    const columns = new Set(
      rows.map((row) => row.column_name)
    );
    const value = {
      adminSessionToken: columns.has("adminSessionToken"),
      adminSessionStartedAt: columns.has("adminSessionStartedAt"),
      isPremium: columns.has("isPremium"),
      premiumSince: columns.has("premiumSince"),
      subscriptionStatus: columns.has("subscriptionStatus"),
      subscriptionCurrentPeriodEnd: columns.has("subscriptionCurrentPeriodEnd"),
      name: columns.has("name"),
      trialStartedAt: columns.has("trialStartedAt"),
      trialEndsAt: columns.has("trialEndsAt")
    };
    userColumnSupportCache = {
      checkedAt: now,
      value
    };
    return value;
  } catch (error) {
    console.error(
      "[auth] No se pudo inspeccionar la tabla User:",
      error
    );
    return missingColumnFallback;
  }
};
const buildUserSelect = async () => {
  const support = await getUserColumnSupport();
  return {
    ...baseUserSelect,
    ...support.name ? { name: true } : {},
    ...support.adminSessionStartedAt ? { adminSessionStartedAt: true } : {},
    ...support.isPremium ? { isPremium: true } : {},
    ...support.premiumSince ? { premiumSince: true } : {},
    ...support.subscriptionStatus ? { subscriptionStatus: true } : {},
    ...support.subscriptionCurrentPeriodEnd ? { subscriptionCurrentPeriodEnd: true } : {},
    ...support.trialStartedAt ? { trialStartedAt: true } : {},
    ...support.trialEndsAt ? { trialEndsAt: true } : {}
  };
};
const findUserByEmail = async (email) => {
  try {
    return await prisma.user.findUnique({
      where: {
        email
      },
      select: await buildUserSelect()
    });
  } catch (error) {
    if (!isMissingColumnError(error)) {
      throw error;
    }
    resetUserColumnSupportCache();
    return await prisma.user.findUnique({
      where: {
        email
      },
      select: baseUserSelect
    });
  }
};
const findUserById = async (id) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id
      },
      select: await buildUserSelect()
    });
  } catch (error) {
    if (!isMissingColumnError(error)) {
      throw error;
    }
    resetUserColumnSupportCache();
    return await prisma.user.findUnique({
      where: {
        id
      },
      select: baseUserSelect
    });
  }
};
const findUserBySessionToken = async (storedToken) => {
  const support = await getUserColumnSupport();
  if (!support.adminSessionToken) {
    return null;
  }
  try {
    return await prisma.user.findFirst({
      where: {
        adminSessionToken: storedToken
      },
      select: await buildUserSelect()
    });
  } catch (error) {
    if (!isMissingColumnError(error)) {
      throw error;
    }
    resetUserColumnSupportCache();
    return null;
  }
};
const getSessionSecret = () => (process.env.SESSION_SECRET || process.env.AUTH_SECRET || process.env.DATABASE_URL || "nexora-local-session-secret").trim();
const signSessionPayload = (payload) => createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
const safeEqual = (a, b) => {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    return false;
  }
  return timingSafeEqual(left, right);
};
const signDbSession = (storedToken, startedAtMs, user) => signSessionPayload(
  `db.${storedToken}.${startedAtMs}.${user.id}.${user.passwordHash}`
);
const signStatelessSession = (userId, startedAtMs, passwordHash) => signSessionPayload(
  `stateless.${userId}.${startedAtMs}.${passwordHash}`
);
const buildDbSessionCookie = (storedToken, startedAt, user) => {
  const startedAtMs = startedAt.getTime();
  const signature = signDbSession(storedToken, startedAtMs, user);
  return `db.${storedToken}.${startedAtMs}.${signature}`;
};
const buildStatelessSessionCookie = (user, startedAt) => {
  const startedAtMs = startedAt.getTime();
  const signature = signStatelessSession(
    user.id,
    startedAtMs,
    user.passwordHash
  );
  return `stateless.${user.id}.${startedAtMs}.${signature}`;
};
const parseSessionToken = (token) => {
  const parts = token.split(".");
  if (parts.length === 4 && parts[0] === "db") {
    return {
      kind: "db",
      storedToken: parts[1],
      startedAtMs: Number(parts[2]),
      signature: parts[3]
    };
  }
  if (parts.length === 4 && parts[0] === "stateless") {
    return {
      kind: "stateless",
      userId: parts[1],
      startedAtMs: Number(parts[2]),
      signature: parts[3]
    };
  }
  return {
    kind: "legacy-db",
    storedToken: token
  };
};
const isExpired = (startedAt) => Date.now() - startedAt.getTime() > ADMIN_SESSION_DURATION_MS;
const storeDbSession = async (user, storedToken, startedAt) => {
  const support = await getUserColumnSupport();
  if (!support.adminSessionToken) {
    return false;
  }
  const data = {
    adminSessionToken: storedToken,
    ...support.adminSessionStartedAt ? { adminSessionStartedAt: startedAt } : {}
  };
  try {
    await prisma.user.update({
      where: {
        id: user.id
      },
      data,
      select: {
        id: true
      }
    });
    return true;
  } catch (error) {
    if (isMissingColumnError(error)) {
      resetUserColumnSupportCache();
      console.warn(
        "[auth] Columnas de sesion no migradas; usando sesion firmada temporal."
      );
      return false;
    }
    console.error(
      "[auth] No se pudo guardar la sesion en DB:",
      error
    );
    return false;
  }
};
const setDbSessionStartedAt = async (userId, startedAt) => {
  const support = await getUserColumnSupport();
  if (!support.adminSessionStartedAt) {
    return false;
  }
  try {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        adminSessionStartedAt: startedAt
      },
      select: {
        id: true
      }
    });
    return true;
  } catch (error) {
    if (isMissingColumnError(error)) {
      resetUserColumnSupportCache();
      return false;
    }
    console.error(
      "[auth] No se pudo actualizar el inicio de sesion:",
      error
    );
    return false;
  }
};
const clearStoredSession = async (userId) => {
  const support = await getUserColumnSupport();
  const data = {};
  if (support.adminSessionToken) {
    data.adminSessionToken = null;
  }
  if (support.adminSessionStartedAt) {
    data.adminSessionStartedAt = null;
  }
  if (Object.keys(data).length === 0) {
    return;
  }
  try {
    await prisma.user.update({
      where: {
        id: userId
      },
      data,
      select: {
        id: true
      }
    });
  } catch (error) {
    if (isMissingColumnError(error)) {
      resetUserColumnSupportCache();
      return;
    }
    console.error(
      "[auth] No se pudo limpiar la sesion:",
      error
    );
  }
};
const withSessionStartedAt = (user, startedAt) => ({
  ...user,
  ...startedAt ? { adminSessionStartedAt: startedAt } : {}
});
const createSession = async (user) => {
  const startedAt = /* @__PURE__ */ new Date();
  const storedToken = generateSessionToken();
  const stored = await storeDbSession(user, storedToken, startedAt);
  const token = stored ? buildDbSessionCookie(storedToken, startedAt, user) : buildStatelessSessionCookie(user, startedAt);
  return { token, startedAt };
};
const loginAdmin = async (email, password) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return null;
    }
    const validPassword = await compare(password, user.passwordHash);
    if (!validPassword) {
      return null;
    }
    const { token, startedAt } = await createSession(user);
    return {
      user: withSessionStartedAt(user, startedAt),
      token
    };
  } catch (error) {
    console.error("[auth] Error en loginAdmin:", error);
    return null;
  }
};
const loginUser = loginAdmin;
const registerUser = async (name, email, password) => {
  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true }
  });
  if (existing) {
    throw new Error("EMAIL_TAKEN");
  }
  const passwordHash = await hash(password, 12);
  const now = /* @__PURE__ */ new Date();
  const trialEndsAt = new Date(now.getTime() + 30 * 60 * 1e3);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "client",
      trialStartedAt: now,
      trialEndsAt
    },
    select: await buildUserSelect()
  });
  const { token, startedAt } = await createSession(user);
  sendWelcomeEmail(email, name).catch(() => {
  });
  return {
    user: withSessionStartedAt(user, startedAt),
    token
  };
};
const getCurrentAdmin = async (token) => {
  if (!token) {
    return null;
  }
  try {
    const parsed = parseSessionToken(token);
    if (parsed.kind === "stateless") {
      if (!Number.isFinite(parsed.startedAtMs)) {
        return null;
      }
      const startedAt2 = new Date(parsed.startedAtMs);
      if (isExpired(startedAt2)) {
        return null;
      }
      const user2 = await findUserById(parsed.userId);
      if (!user2) {
        return null;
      }
      const expected = signStatelessSession(
        user2.id,
        parsed.startedAtMs,
        user2.passwordHash
      );
      if (!safeEqual(expected, parsed.signature)) {
        return null;
      }
      return withSessionStartedAt(user2, startedAt2);
    }
    const user = await findUserBySessionToken(parsed.storedToken);
    if (!user) {
      return null;
    }
    const parsedStartedAt = parsed.kind === "db" && Number.isFinite(parsed.startedAtMs) ? new Date(parsed.startedAtMs) : void 0;
    if (parsed.kind === "db") {
      if (!parsedStartedAt) {
        return null;
      }
      const expected = signDbSession(
        parsed.storedToken,
        parsed.startedAtMs,
        user
      );
      if (!safeEqual(expected, parsed.signature)) {
        return null;
      }
    }
    const startedAt = parsedStartedAt || user.adminSessionStartedAt || void 0;
    if (startedAt && isExpired(startedAt)) {
      await clearStoredSession(user.id);
      return null;
    }
    if (!startedAt) {
      const now = /* @__PURE__ */ new Date();
      const stored = await setDbSessionStartedAt(user.id, now);
      if (!stored) {
        return null;
      }
      return withSessionStartedAt(user, now);
    }
    return withSessionStartedAt(user, startedAt);
  } catch (error) {
    console.error(
      "[auth] Error recuperando la sesion actual:",
      error
    );
    return null;
  }
};
const getCurrentUser = getCurrentAdmin;
const userHasPremiumAccess = (user) => {
  if (!user) {
    return false;
  }
  if (user.role === "premium" || user.role === "admin" || user.role === "owner") {
    return true;
  }
  if (user.trialEndsAt && /* @__PURE__ */ new Date() < user.trialEndsAt) {
    return true;
  }
  if (user.isPremium === true) {
    if (user.subscriptionCurrentPeriodEnd) {
      return /* @__PURE__ */ new Date() < user.subscriptionCurrentPeriodEnd;
    }
    return true;
  }
  return user.subscriptionStatus === "active" || user.subscriptionStatus === "trialing";
};
const userIsAdmin = (user) => {
  if (!user) return false;
  return user.role === "admin" || user.role === "owner";
};
const logoutAdmin = async (userId) => {
  await clearStoredSession(userId);
};
const logoutUser = logoutAdmin;
const getTrialRemainingMs = (user) => {
  if (!user?.trialEndsAt) return 0;
  const remaining = user.trialEndsAt.getTime() - Date.now();
  return Math.max(0, remaining);
};

export { getCurrentAdmin, getCurrentUser, getTrialRemainingMs, loginAdmin, loginUser, logoutAdmin, logoutUser, registerUser, userHasPremiumAccess, userIsAdmin };
