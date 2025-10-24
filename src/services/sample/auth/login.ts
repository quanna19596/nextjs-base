import SampleService from "@/services/sample";
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

const login = async (request: TLoginRequest): Promise<TLoginResponseSuccess> => {
  const { body } = request;
  const service = await SampleService();
  const response = await service.post(`/auth/login`, body); // emilys / emilyspass
  return response.data;
};

export default login;
