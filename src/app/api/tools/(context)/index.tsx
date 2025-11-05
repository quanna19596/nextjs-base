"use client";

import { JSX } from "react";
import { AppLoadingProvider } from "./app-loading";

export const ContextWrapper = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <AppLoadingProvider>{children}</AppLoadingProvider>;
};

export default ContextWrapper;
