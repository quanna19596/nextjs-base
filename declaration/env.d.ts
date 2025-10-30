/* eslint-disable @typescript-eslint/naming-convention */
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DOMAIN?: string;
      SAMPLE_SERVICE_BASE_URL?: string;
      NEXT_PUBLIC_SAMPLE_SERVICE_BASE_URL?: string;
      ORIGIN_URL?: string;
      NEXT_PUBLIC_ORIGIN_URL?: string;
      NEXTAUTH_URL?: string;
      NEXTAUTH_SECRET?: string;
      AUTH_SECRET?: string;
      VERCEL?: "1";
    }
  }
}
