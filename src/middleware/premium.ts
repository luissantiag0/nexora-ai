import { defineMiddleware } from "astro:middleware";
import { SESSION_COOKIE } from "../lib/session";
import {
  getCurrentUser,
  userHasPremiumAccess,
} from "../lib/auth";

export const onRequest = defineMiddleware(
  async (context, next) => {
    const token =
      context.cookies.get(SESSION_COOKIE)?.value;

    const user =
      context.locals.user ??
      (await getCurrentUser(token));

    if (!user) {
      return context.redirect("/login");
    }

    if (!userHasPremiumAccess(user)) {
      return context.redirect("/upgrade");
    }

    context.locals.user = user;

    return next();
  }
);
