// import { getLocale } from "next-intl/server";

import { AxiosInstance } from "axios";

import Interceptors from "@/services/interceptors";

const SampleService = async (): Promise<AxiosInstance> => {
  //   const locale = await getLocale();
  const token = "";
  const commonParams = {};
  const commonHeaders = {
    Authorization: `Bearer ${token}`,
  };

  const service = Interceptors({
    baseURL: process.env.SAMPLE_SERVICE_BASE_URL,
    commonHeaders,
    commonParams,
  });

  return service;
};

export default SampleService;
