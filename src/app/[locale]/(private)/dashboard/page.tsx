"use client";

import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

const DashboardPage1 = () => {
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

export default DashboardPage1;
