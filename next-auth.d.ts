import { TLoginResponseSuccess } from "@/services/sample/auth/login";

declare module "next-auth" {
  interface Session extends TLoginResponseSuccess {}
  interface User extends TLoginResponseSuccess {}
}

declare module "next-auth/jwt" {
  interface JWT extends TLoginResponseSuccess {}
}
