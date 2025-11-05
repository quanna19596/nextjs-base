import { ERootDir } from "@/app/api/tools/(common)/enums";
import { apiWrapper, getFiles } from "@/app/api/tools/(common)/utils";

export const GET = async (request: Request): Promise<Response> => {
  const resp = await apiWrapper(async () => {
    const { searchParams } = new URL(request.url);
    const service = searchParams.get("service");

    const apiFiles = await getFiles({
      dir: `${ERootDir.SERVICES}/${service}`,
      fileNames: ["api.ts"],
    });

    console.log(apiFiles);

    return { data: {} };
  });

  return Response.json(resp);
};
