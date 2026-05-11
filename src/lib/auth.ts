import { compare } from "bcryptjs";

import { prisma } from "./prisma";

import {
  generateSessionToken,
} from "./session";

export const loginAdmin = async (
  email: string,
  password: string
) => {
  const user =
    await prisma.user.findUnique({
      where: {
        email,
      },
    });

  if (!user) {
    return null;
  }

  const validPassword =
    await compare(
      password,
      user.passwordHash
    );

  if (!validPassword) {
    return null;
  }

  const token =
    generateSessionToken();

  await prisma.user.update({
    where: {
      id: user.id,
    },

    data: {
      adminSessionToken: token,
    },
  });

  return {
    user,
    token,
  };
};

export const getCurrentAdmin =
  async (token?: string) => {
    if (!token) {
      return null;
    }

    return prisma.user.findFirst({
      where: {
        adminSessionToken: token,
      },
    });
  };

export const logoutAdmin =
  async (userId: string) => {
    await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        adminSessionToken: null,
      },
    });
  };
