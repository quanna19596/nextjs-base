import { getBaseUrl, getDirectlyEntries } from "@/app/api/tools/(common)/utils";

export const GET = async (): Promise<Response> => {
  const rawServices = await getDirectlyEntries("src/services");
  const servicesWithGroups = await Promise.all(
    rawServices.map(async (service) => ({
      name: service,
      baseUrl: getBaseUrl(service),
      groups: await getDirectlyEntries(`src/services/${service}`),
    })),
  );
  const servicesWithEndpoints = await Promise.all(
    servicesWithGroups.map(async (service) => ({
      ...service,
      groups: await Promise.all(
        service.groups.map(async (group) => ({
          name: group,
          endpoints: await getDirectlyEntries(`src/services/${service.name}/${group}`),
        })),
      ),
    })),
  );

  return Response.json(servicesWithEndpoints);
};

// export const POST = async (request: Request): void => {};
