import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Interceptors from "@/services/interceptors";

const PetStore8Service = async (): Promise<AxiosInstance> => {
  const service = Interceptors({
    baseURL:
      process.env.PET_STORE_8_SERVICE_BASE_URL || process.env.NEXT_PUBLIC_PET_STORE_8_SERVICE_BASE_URL,
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

  service.interceptors.request.use(requestHandler);
  service.interceptors.response.use(responseSuccessHandler, responseFailedHandler);

  return service;
};

export default PetStore8Service;
