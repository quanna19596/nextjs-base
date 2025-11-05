"use client";

import { JSX, createContext, useContext, useState } from "react";
import { FullLoading } from "@/app/api/tools/(components)/full-loading";

type TAppLoadingContextType = {
  appLoading: boolean;
  setAppLoading: (value: boolean) => void;
};

const AppLoadingContext = createContext<TAppLoadingContextType | null>(null);

export const AppLoadingProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [appLoading, setAppLoading] = useState<boolean>(false);

  return (
    <AppLoadingContext.Provider value={{ appLoading, setAppLoading }}>
      {children}
      <FullLoading />
    </AppLoadingContext.Provider>
  );
};

export const useAppLoading = (): TAppLoadingContextType => {
  const ctx = useContext(AppLoadingContext);
  if (!ctx) throw new Error("useAppLoading must be used inside <AppLoadingContext>");
  return ctx;
};
