import { FormEvent } from "react";
import * as z from "zod";
import { TTranslationKey } from "@root/generated/i18n.types";

export type TCookieStructure = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export type TFormConfig<T extends z.ZodRawShape> = {
  labelTranslationKey: {
    [K in keyof T]: TTranslationKey;
  };
  placeholderTranslationKey: {
    [K in keyof T]: TTranslationKey;
  };
  name: {
    [K in keyof T]: keyof T;
  };
  defaultValues: z.infer<z.ZodObject<T>>;
  validationRules?: z.ZodObject<T>;
};

export type TOnSubmitFormEvent = FormEvent<HTMLFormElement>;
export type TOnChangeInputEvent = ChangeEvent<HTMLInputElement>;
