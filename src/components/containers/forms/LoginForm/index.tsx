"use client";

import { JSX } from "react";
import { useTranslations } from "@/i18n";
import { TLoginFormProps } from "./types";

const LoginForm = ({}: TLoginFormProps): JSX.Element => {
  const t = useTranslations();
  return <div>{t("App.Public.Layout")}</div>;
};

export default LoginForm;
