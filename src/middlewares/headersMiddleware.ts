import { type NextRequest, NextResponse } from "next/server";

const headersMiddleware = (request: NextRequest): NextResponse => {
  const response = NextResponse.next();
  response.headers.set("x-current-path", request.nextUrl.pathname);
  return response;
};

export default headersMiddleware;
