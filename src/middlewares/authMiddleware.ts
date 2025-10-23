import withAuth from "next-auth/middleware";
import { NextMiddleware } from "next/server";
import privateRoutes from "@/../generator/routes/private-routes.json";

const authMiddleware = withAuth({
  callbacks: {
    authorized: async ({ token, req }) => {
      const { pathname } = req.nextUrl;
      const isLoggedIn = !!token;
      const isPrivate = privateRoutes.some((rgRoute) =>
        (rgRoute as unknown as RegExp).test(pathname)
      );

      return isLoggedIn || !isPrivate;
    },
  },
  pages: {
    signIn: "/login",
  },
}) as unknown as NextMiddleware;

export default authMiddleware;
