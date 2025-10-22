import withAuth from "next-auth/middleware";
import { NextMiddleware } from "next/server";
import rawPrivateRoutes from "@/../generator/routes/private-routes.json";
import { routing } from "@/i18n/routing";

const authMiddleware = withAuth({
  callbacks: {
    authorized: async ({ token, req }) => {
      const isLoggedIn = !!token;
      console.log(routing.locales, rawPrivateRoutes);
      return isLoggedIn || req.nextUrl.pathname !== "/vi/dashboard";
    },
  },
  pages: {
    signIn: "/login",
  },
}) as unknown as NextMiddleware;

export default authMiddleware;
