import { NextMiddleware, NextRequest, NextResponse } from "next/server";

const chainMiddlewares =
  (...middlewares: NextMiddleware[]): NextMiddleware =>
  async (req: NextRequest, event) => {
    let response;

    for (const middleware of middlewares) {
      const result = await middleware(req, event);

      if (result) {
        if (result.headers.get("location") || result.headers.get("x-middleware-rewrite")) {
          return result;
        }

        response = result;
      }
    }

    return response ?? NextResponse.next();
  };

export default chainMiddlewares;
