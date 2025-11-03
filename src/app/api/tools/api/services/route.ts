import fs from "fs/promises";
import path from "path";
import { ERootDir } from "@/app/api/tools/(common)/enums";
import {
  apiWrapper,
  generateServiceRecord,
  getBaseUrl,
  getDirectlyEntries,
  getNamingCases,
} from "@/app/api/tools/(common)/utils";

export const GET = async (): Promise<Response> => {
  const resp = await apiWrapper(async () => {
    const rawServices = await getDirectlyEntries(`${ERootDir.SERVICES}`);
    const services = await Promise.all(
      rawServices.map(async (service) => await generateServiceRecord(service)),
    );

    return { data: services };
  });

  return Response.json(resp);
};

export const POST = async (request: Request): Promise<Response> => {
  const resp = await apiWrapper(async () => {
    const rawBody: { serviceName: string; baseUrl: string } = await request.json();
    const body: { serviceName: string; baseUrl: string } = {
      serviceName: rawBody.serviceName.trim(),
      baseUrl: rawBody.baseUrl.trim(),
    };
    const namingCasesServiceName = getNamingCases(body.serviceName);

    const rawServices = await getDirectlyEntries(`${ERootDir.SERVICES}`);

    const alreadyExist = rawServices.find(
      (service) =>
        service === namingCasesServiceName.kebabName || getBaseUrl(service) === body.baseUrl,
    );

    if (alreadyExist) {
      return { message: "Service already exist", isSuccess: false };
    }

    const envConstantName = `${namingCasesServiceName.constantName}_SERVICE_BASE_URL`;
    const publicEnvConstantName = `NEXT_PUBLIC_${namingCasesServiceName.constantName}_SERVICE_BASE_URL`;

    const envPath = path.resolve(process.cwd(), ".env");
    const envContent = await fs.readFile(envPath, "utf-8");
    const lines = envContent.split("\n");

    const serverScopeIndex = lines.findIndex((line) => line.trim() === "# SERVER");
    const clientScopeIndex = lines.findIndex((line) => line.trim() === "# CLIENT");

    if (serverScopeIndex === -1 || clientScopeIndex === -1) {
      throw new Error("Không tìm thấy scope # SERVER hoặc # CLIENT trong file .env");
    }

    const newServerLine = `${envConstantName}=${body.baseUrl}`;
    const newClientLine = `${publicEnvConstantName}=${body.baseUrl}`;

    lines.splice(serverScopeIndex + 1, 0, newServerLine);

    const updatedClientScopeIndex = lines.findIndex((line) => line.trim() === "# CLIENT");
    lines.splice(updatedClientScopeIndex + 1, 0, newClientLine);

    await fs.writeFile(envPath, lines.join("\n"), "utf-8");

    const serviceDirPath = path.resolve(
      process.cwd(),
      `${ERootDir.SERVICES}/${namingCasesServiceName.kebabName}`,
    );

    await fs.mkdir(serviceDirPath, { recursive: true });
    await fs.writeFile(path.join(serviceDirPath, "models.d.ts"), "", "utf-8");
    await fs.writeFile(path.join(serviceDirPath, "enums.ts"), "", "utf-8");

    const indexTsContent = `import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Interceptors from "@/services/interceptors";

const Service = async (): Promise<AxiosInstance> => {
  const service = Interceptors({
    baseURL:
      process.env.${envConstantName} || process.env.${publicEnvConstantName},
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

export default Service;
`;

    await fs.writeFile(path.join(serviceDirPath, "index.ts"), indexTsContent, "utf-8");

    return {
      data: {
        name: body.serviceName,
        baseUrl: body.baseUrl,
        ...namingCasesServiceName,
        numberOfGroups: 0,
        numberOfEndpoints: 0,
        numberOfModels: 0,
      },
      message: "Service has been created",
    };
  });

  return Response.json(resp);
};
