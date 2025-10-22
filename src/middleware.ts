import authMiddleware from "./middlewares/authMiddleware";
import chainMiddlewares from "./middlewares/chain";
import i18nMiddleware from "./middlewares/i18nMiddleware";

export default chainMiddlewares(authMiddleware, i18nMiddleware);

export const config = {
  matcher: ["/", "/(vi|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
