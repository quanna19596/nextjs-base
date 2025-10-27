import { FormEvent } from "react";

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

export type TFormFieldConfig = {
  labelKey: string;
  name: string;
  defaultValues: string;
  placeholder: string;
  validationRule?: string;
};

export type TOnSubmitFormEvent = FormEvent<HTMLFormElement>;
export type TOnChangeInputEvent = ChangeEvent<HTMLInputElement>;
