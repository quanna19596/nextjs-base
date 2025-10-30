import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const i18nMiddleware = (request: NextRequest): NextResponse | undefined => {
  if (request.nextUrl.pathname.startsWith("/api")) return;
  return createMiddleware(routing)(request);
};

export default i18nMiddleware;
