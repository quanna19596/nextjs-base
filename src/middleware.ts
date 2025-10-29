import packageJson from "@root/package.json";
import authMiddleware from "./middlewares/authMiddleware";
import chainMiddlewares from "./middlewares/chain";
import headersMiddleware from "./middlewares/headersMiddleware";
import i18nMiddleware from "./middlewares/i18nMiddleware";

export default chainMiddlewares(authMiddleware, i18nMiddleware);

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
