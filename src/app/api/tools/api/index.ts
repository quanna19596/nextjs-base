import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const originURL = process.env.ORIGIN_URL || process.env.NEXT_PUBLIC_ORIGIN_URL;

const ToolsAPI = axios.create({
  baseURL: `${originURL}/api/tools/api`,
});

const requestHandler = async (
  request: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  return request;
};

const responseSuccessHandler = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const responseFailedHandler = async (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

ToolsAPI.interceptors.request.use(requestHandler);
ToolsAPI.interceptors.response.use(responseSuccessHandler, responseFailedHandler);

export default ToolsAPI;
