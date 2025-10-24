// import { getLocale } from "next-intl/server";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import Interceptors from "@/services/interceptors";
import {
  getAuthSession,
  getBearerToken,
  updateAuthSession,
} from "@/utils/auth";
import { TRequestQueueItem } from "@/services/types";
import { signOut } from "next-auth/react";
import http from "@/services/http";
import refreshToken, {
  TRefreshTokenResponseFailed,
  TRefreshTokenResponseSuccess,
} from "./auth/refresh-token";
import { EHttpStatusCode } from "@/services/enums";

let isRefreshingAccessToken: boolean = false;
let requestQueue: TRequestQueueItem[] = [];

const refreshTokens = async (): Promise<string | undefined> => {
  const session = await getAuthSession();

  if (!session?.refreshToken) {
    signOut();
    return;
  }

  const currentRefreshToken = getBearerToken(session?.refreshToken);

  const { data, error } = await http.request<
    TRefreshTokenResponseSuccess,
    TRefreshTokenResponseFailed
  >(refreshToken({ body: { refreshToken: currentRefreshToken } }));

  if (error || !data) {
    onTokenRefreshed(new Error("Failed to refresh access token"));
    signOut();
    return;
  }

  await updateAuthSession(data);

  return data.accessToken;
};

const onTokenRefreshed = (
  error: Error | null,
  newAccessToken?: string
): void => {
  requestQueue.map(
    (cb: (error: Error | null, newAccessToken?: string) => void) =>
      cb(error, newAccessToken)
  );
};

const SampleService = async (): Promise<AxiosInstance> => {
  //   const locale = await getLocale();
  const session = await getAuthSession();

  const commonParams: { [key: string]: string } = {};
  const commonHeaders: { [key: string]: string } = {};

  const accessToken = getBearerToken(session?.accessToken);

  if (accessToken) commonHeaders.Authorization = accessToken;

  const service = Interceptors({
    baseURL:
      process.env.SAMPLE_SERVICE_BASE_URL ||
      process.env.NEXT_PUBLIC_SAMPLE_SERVICE_BASE_URL,
    commonHeaders,
    commonParams,
  });

  const requestHandler = async (
    request: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => request;

  const responseSuccessHandler = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  const responseFailedHandler = async (
    error: AxiosError
  ): Promise<void | AxiosResponse<any>> => {
    const { status } = error.response || {};
    const originalRequest = error.config;
    const isAccessTokenExpired = status === EHttpStatusCode.BAD_REQUEST;

    if (isAccessTokenExpired && originalRequest) {
      if (!isRefreshingAccessToken) {
        isRefreshingAccessToken = true;
        refreshTokens()
          .then((newAccessToken) => {
            onTokenRefreshed(null, newAccessToken);
          })
          .catch(() => {
            onTokenRefreshed(new Error("Failed to refresh access token"));
            signOut();
            return Promise.reject(error);
          })
          .finally(() => {
            isRefreshingAccessToken = false;
            requestQueue = [];
          });
      }

      const storeOriginalRequest = new Promise((resolve, reject) => {
        requestQueue.push((error: Error | null, newAccessToken?: string) => {
          if (error) return reject(error);

          if (newAccessToken)
            originalRequest.headers.Authorization =
              getBearerToken(newAccessToken);

          return resolve(axios(originalRequest));
        });
      });

      return storeOriginalRequest as Promise<void | AxiosResponse<any>>;
    }

    return Promise.reject(error);
  };

  service.interceptors.request.use(requestHandler);
  service.interceptors.response.use(
    responseSuccessHandler,
    responseFailedHandler
  );

  return service;
};

export default SampleService;
