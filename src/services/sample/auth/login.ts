import SampleService from "@/services/sample";
import {
  TRequestPaths,
  TRequestQueries,
  TRequestBody,
  TResponseSuccess,
  TResponseFailed,
  TRequest,
} from "@/services/sample/types";

export type TLoginPaths = TRequestPaths<{}>;

export type TLoginQueries = TRequestQueries<{}>;

export type TLoginBody = TRequestBody<{}>;

export type TLoginResponseSuccess = TResponseSuccess<{}>;

export type TLoginResponseFailed = TResponseFailed<{}>;

export type TLoginRequest = TRequest<TLoginPaths, TLoginQueries, TLoginBody>;

const login = async (
  request: TLoginRequest
): Promise<TLoginResponseSuccess> => {
  const { body } = request;
  const service = await SampleService();
  const response = await service.get(`/login`, body);
  return response.data;
};

export default login;
