import { compare } from 'bcryptjs';
import { p as prisma } from './prisma_Dd9Pg7uq.mjs';
import { randomUUID } from 'node:crypto';

const SESSION_COOKIE = "nexora_admin_session";
const generateSessionToken = () => {
  return randomUUID();
};
const sessionCookieConfig = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7
};

const loginAdmin = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!user) {
    return null;
  }
  const validPassword = await compare(
    password,
    user.passwordHash
  );
  if (!validPassword) {
    return null;
  }
  const token = generateSessionToken();
  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      adminSessionToken: token
    }
  });
  return {
    user,
    token
  };
};
const getCurrentAdmin = async (token) => {
  if (!token) {
    return null;
  }
  return prisma.user.findFirst({
    where: {
      adminSessionToken: token
    }
  });
};

export { SESSION_COOKIE as S, getCurrentAdmin as g, loginAdmin as l, sessionCookieConfig as s };
