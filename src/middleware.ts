// import { NextMiddleware } from "next/server";
// import authMiddleware from "./middlewares/authMiddleware";
// import chainMiddlewares from "./middlewares/chain";
// import i18nMiddleware from "./middlewares/i18nMiddleware";

// export default chainMiddlewares(
//   i18nMiddleware,
//   authMiddleware as NextMiddleware
// );
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const i18nMiddleware = createMiddleware(routing);

const authMiddleware = withAuth({
  callbacks: {
    authorized: async ({ token, req }) => {
      console.log("WithAuth", token, req.nextUrl.pathname);
      return !!token || req.nextUrl.pathname !== "/vi/dashboard";
    },
  },
  pages: {
    signIn: "/vi/login",
  },
});

// export default async function middleware(
//   req: NextRequest,
//   event: NextFetchEvent
// ) {
//   const i18nResponse = await i18nMiddleware(req);

//   if (i18nResponse && i18nResponse.headers.get("x-middleware-rewrite")) {
//     return i18nResponse;
//   }

//   if (req.nextUrl.pathname.startsWith("/vi/dashboard")) {
//     return authMiddleware(req as NextRequestWithAuth, event);
//   }

//   return NextResponse.next();
// }

export default authMiddleware;

export const config = {
  matcher: ["/", "/(vi|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
