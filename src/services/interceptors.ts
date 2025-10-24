import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const Interceptors = ({
  baseURL,
  commonHeaders,
  commonParams,
  onRequest,
  onResponseSuccess,
  onResponseFailed,
}: {
  baseURL?: string;
  commonHeaders?: { [key: string]: string | number | undefined };
  commonParams?: { [key: string]: string | number | undefined };
  onRequest?: (request: InternalAxiosRequestConfig) => void;
  onResponseSuccess?: (response: AxiosResponse) => void;
  onResponseFailed?: (error: AxiosError) => void;
}): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: commonHeaders,
    params: commonParams,
  });

  const requestHandler = async (
    request: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    onRequest?.(request);
    return request;
  };

  const responseSuccessHandler = (response: AxiosResponse): AxiosResponse => {
    onResponseSuccess?.(response);
    return response;
  };

  const responseFailedHandler = async (error: AxiosError): Promise<AxiosError> => {
    onResponseFailed?.(error);
    return Promise.reject(error);
  };

  instance.interceptors.request.use(requestHandler);
  instance.interceptors.response.use(responseSuccessHandler, responseFailedHandler);

  return instance;
};

export default Interceptors;
