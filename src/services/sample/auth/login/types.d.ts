import {
  TRequest,
  TRequestBody,
  TRequestPaths,
  TRequestQueries,
  TResponseFailed,
  TResponseSuccess,
} from "@/services/types";

export type TLoginPaths = TRequestPaths<{}>;

export type TLoginQueries = TRequestQueries<{}>;

export type TLoginBody = TRequestBody<{
  username: string;
  password: string;
}>;

export type TLoginResponseSuccess = TResponseSuccess<{
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}>;

export type TLoginResponseFailed = TResponseFailed<{}>;

export type TLoginRequest = TRequest<TLoginPaths, TLoginQueries, TLoginBody>;
