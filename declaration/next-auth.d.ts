/* eslint-disable @typescript-eslint/naming-convention */
import { TCookieStructure } from "@/common/types";

declare module "next-auth" {
  interface Session extends TCookieStructure {}
  interface User extends TCookieStructure {}
}

declare module "next-auth/jwt" {
  interface JWT extends TCookieStructure {}
}
