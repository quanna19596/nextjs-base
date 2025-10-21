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

export type TOnSubmitFormEvent = FormEvent<HTMLFormElement>;
export type TOnChangeInputEvent = ChangeEvent<HTMLInputElement>;
