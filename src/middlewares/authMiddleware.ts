import withAuth from "next-auth/middleware";
import { NextMiddleware } from "next/server";
import privateRoutes from "@root/generated/private-routes.json";
import packageJson from "@root/package.json";

const authMiddleware = withAuth({
  callbacks: {
    authorized: async ({ token, req }) => {
      const { pathname } = req.nextUrl;
      const { locales } = packageJson.config.internationalization;
      const isLocaleRoute = locales.includes(pathname.split("/")[1]);

      if (!isLocaleRoute) return true;

      const isLoggedIn = !!token;
      const isPrivate = privateRoutes.some((route) => new RegExp(`^${route}$`).test(pathname));

      return isLoggedIn || !isPrivate;
    },
  },
  pages: {
    signIn: "/login",
  },
}) as unknown as NextMiddleware;

export default authMiddleware;
