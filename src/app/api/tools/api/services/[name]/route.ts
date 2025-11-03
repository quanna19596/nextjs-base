import fs from "fs/promises";
import path from "path";
import { ERootDir } from "@/app/api/tools/(common)/enums";
import {
  apiWrapper,
  deleteFolder,
  generateServiceRecord,
  getApiFiles,
  getBaseUrl,
  getNamingCases,
  replaceInFile,
} from "@/app/api/tools/(common)/utils";

export const GET = async (
  _: Request,
  { params }: { params: { name: string } },
): Promise<Response> => {
  const resp = await apiWrapper(async () => {
    const targetService = await generateServiceRecord(params.name);
    return { data: targetService };
  });
  return Response.json(resp);
};

export const PATCH = async (
  request: Request,
  { params }: { params: { name: string } },
): Promise<Response> => {
  const resp = await apiWrapper(async () => {
    const rawBody: { serviceName: string; baseUrl: string } = await request.json();
    const body: { serviceName: string; baseUrl: string } = {
      serviceName: rawBody.serviceName.trim(),
      baseUrl: rawBody.baseUrl.trim(),
    };
    const envPath = path.join(process.cwd(), ERootDir.ENV_FILE);
    const oldNamingCases = getNamingCases(params.name);
    const newNamingCases = getNamingCases(body.serviceName);

    const configChange = {
      oldServiceDir: path.join(process.cwd(), `${ERootDir.SERVICES}/${params.name}`),
      newServiceDir: path.join(process.cwd(), `${ERootDir.SERVICES}/${body.serviceName}`),
      oldServiceImport: `@/services/${oldNamingCases.kebabName}`,
      newServiceImport: `@/services/${newNamingCases.kebabName}`,
      oldEnvVar: `${oldNamingCases.constantName}_SERVICE_BASE_URL`,
      newEnvVar: `${newNamingCases.constantName}_SERVICE_BASE_URL`,
      oldPublicEnvVar: `NEXT_PUBLIC_${oldNamingCases.constantName}_SERVICE_BASE_URL`,
      newPublicEnvVar: `NEXT_PUBLIC_${newNamingCases.constantName}_SERVICE_BASE_URL`,
      oldBaseUrl: getBaseUrl(params.name),
      newBaseUrl: body.baseUrl,
    };

    const apiFiles = await getApiFiles(configChange.oldServiceDir);
    if (apiFiles.length > 0) {
      for (const apiFile of apiFiles) {
        await replaceInFile(apiFile, {
          [`import Service from "${configChange.oldServiceImport}";`]: `import Service from "${configChange.newServiceImport}";`,
        });
      }
    }

    const indexPath = `${configChange.oldServiceDir}/index.ts`;
    await replaceInFile(indexPath, {
      [`process.env.${configChange.oldEnvVar}`]: `process.env.${configChange.newEnvVar}`,
      [`process.env.${configChange.oldPublicEnvVar}`]: `process.env.${configChange.newPublicEnvVar}`,
    });

    await replaceInFile(envPath, {
      [`${configChange.oldEnvVar}=${configChange.oldBaseUrl}`]: `${configChange.newEnvVar}=${configChange.newBaseUrl}`,
      [`${configChange.oldPublicEnvVar}=${configChange.oldBaseUrl}`]: `${configChange.newPublicEnvVar}=${configChange.newBaseUrl}`,
    });

    await fs.rename(configChange.oldServiceDir, configChange.newServiceDir);

    const serviceUpdated = generateServiceRecord(body.serviceName);

    return { data: serviceUpdated, message: "Service has been updated" };
  });

  return Response.json(resp);
};

export const DELETE = async (
  _: Request,
  { params }: { params: { name: string } },
): Promise<Response> => {
  const resp = await apiWrapper(async () => {
    const targetService = await generateServiceRecord(params.name);
    await deleteFolder(`${ERootDir.SERVICES}/${params.name}`);

    return { data: targetService, message: "Service has been deleted" };
  });
  return Response.json(resp);
};
