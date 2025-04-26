import SampleService from "@/services/sample";
import {
  TPaths,
  TQueries,
  TBody,
  TResponseSuccess,
  TResponseFailed,
  TRequest,
} from "@/services/sample/types";

export type TLoginPaths = TPaths<{}>;

export type TLoginQueries = TQueries<{}>;

export type TLoginBody = TBody<{}>;

export type TLoginResponseSuccess = TResponseSuccess<{}>;

export type TLoginResponseFailed = TResponseFailed<{}>;

export type TLoginRequest = TRequest<TLoginPaths, TLoginQueries, TLoginBody>;
// export type TLoginResponse = TResponse<TLoginPaths, TLoginQueries, TLoginBody>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const login = async (request: TLoginRequest): Promise<any> => {
  const service = await SampleService();
  const response = await service.get(`/content/${slug}`, {
    params: params?.queries,
  });
  return response.data;
};

export default login;
