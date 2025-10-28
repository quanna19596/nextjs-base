"use client";

import { JSX } from "react";
import { signOut } from "next-auth/react";
import { useTranslations } from "@/i18n";
import { TPageProps } from "./types";

const Page = ({}: TPageProps): JSX.Element => {
  const t = useTranslations();

  return (
    <div>
      <span>{t("App.Private.Dashboard.Page")}</span>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Page;
