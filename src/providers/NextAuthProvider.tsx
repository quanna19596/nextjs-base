"use client";

import { JSX } from "react";
import { SessionProvider } from "next-auth/react";

const NextAuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
