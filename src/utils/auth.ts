import { getServerSession, Session } from "next-auth";
import { getSession } from "next-auth/react";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TCookieStructure } from "@/common/types";

export const getAuthSession = async (): Promise<Session | null> => {
  const session = (await getSession()) || (await getServerSession(authOptions));
  return session;
};

export const getBearerToken = (token?: string): string => {
  if (!token) return "";
  return `Bearer ${token}`;
};

export const updateAuthSession = async (
  cookieStructure: Partial<TCookieStructure>
): Promise<void> => {
  await fetch("/api/auth/session", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cookieStructure),
  });
};
