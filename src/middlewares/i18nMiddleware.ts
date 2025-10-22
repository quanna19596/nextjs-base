import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const i18nMiddleware = createMiddleware(routing);

export default i18nMiddleware;
