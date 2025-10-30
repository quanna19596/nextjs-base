import {
  TRequest,
  TRequestBody,
  TRequestPaths,
  TRequestQueries,
  TResponseFailed,
  TResponseSuccess,
} from "@/services/types";

export type TRefreshTokenPaths = TRequestPaths<{}>;

export type TRefreshTokenQueries = TRequestQueries<{}>;

export type TRefreshTokenBody = TRequestBody<{
  refreshToken: string;
}>;

export type TRefreshTokenResponseSuccess = TResponseSuccess<{
  accessToken: string;
  refreshToken: string;
}>;

export type TRefreshTokenResponseFailed = TResponseFailed<{}>;

export type TRefreshTokenRequest = TRequest<
  TRefreshTokenPaths,
  TRefreshTokenQueries,
  TRefreshTokenBody
>;
