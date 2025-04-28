// import { getLocale } from "next-intl/server";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { AxiosInstance } from "axios";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Interceptors from "@/services/interceptors";

const SampleService = async (): Promise<AxiosInstance> => {
  //   const locale = await getLocale();
  const clientSession = await getSession();
  let serverSession = null;

  try {
    serverSession = await getServerSession(authOptions);
  } catch {}

  const commonParams: { [key: string]: string } = {};
  const commonHeaders: { [key: string]: string } = {};

  if (clientSession && clientSession.accessToken) {
    commonHeaders.Authorization = `Bearer ${clientSession.accessToken}`;
  }

  if (serverSession && serverSession.accessToken) {
    commonHeaders.Authorization = `Bearer ${serverSession.accessToken}`;
  }

  const service = Interceptors({
    baseURL:
      process.env.SAMPLE_SERVICE_BASE_URL ||
      process.env.NEXT_PUBLIC_SAMPLE_SERVICE_BASE_URL,
    commonHeaders,
    commonParams,
  });

  return service;
};

export default SampleService;
