import { NextMiddleware, NextRequest, NextResponse } from "next/server";

const chainMiddlewares =
  (...middlewares: NextMiddleware[]): NextMiddleware =>
  async (req: NextRequest, event) => {
    let response: NextResponse | undefined;

    for (const middleware of middlewares) {
      const result = await middleware(req, event);
      if (result) return result;
    }

    return response ?? NextResponse.next();
  };

export default chainMiddlewares;
