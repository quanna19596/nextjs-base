import { useTranslations as useTranslationsNextIntl } from "next-intl";
import { TTranslationKey } from "@root/generated/i18n.types";

export const useTranslations = (
  key?: string,
): ((key: TTranslationKey, ...args: any[]) => string) => {
  const t = useTranslationsNextIntl(key);
  return ((key: TTranslationKey, ...args: any[]) => t(key, ...args)) as (
    key: TTranslationKey,
    ...args: any[]
  ) => string;
};
