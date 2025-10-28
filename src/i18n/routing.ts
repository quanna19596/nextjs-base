import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import packageJson from "@root/package.json";

export const routing = defineRouting({
  locales: packageJson.config.internationalization.locales,
  defaultLocale: packageJson.config.internationalization.defaultLocale,
  localePrefix: "always",
  localeDetection: false,
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
