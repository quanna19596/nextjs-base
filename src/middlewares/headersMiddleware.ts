import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const headersMiddleware = (request: NextRequest): void => {
  console.log("headersMiddleware");
  const headers = new Headers(request.headers);
  headers.append("x-current-path", request.nextUrl.pathname);
};

export default headersMiddleware;
