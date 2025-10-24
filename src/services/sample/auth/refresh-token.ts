import SampleService from "@/services/sample";
import {
  TRequestPaths,
  TRequestQueries,
  TRequestBody,
  TResponseSuccess,
  TResponseFailed,
  TRequest,
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

const refreshToken = async (
  request: TRefreshTokenRequest
): Promise<TRefreshTokenResponseSuccess> => {
  const { body } = request;
  const service = await SampleService();
  const response = await service.post(`/auth/refresh`, body);
  return response.data;
};

export default refreshToken;
