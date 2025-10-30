import fs from "fs/promises";
import path from "path";

export const getDirectlyEntries = async (
  rootPath: string,
  type?: "folder" | "file",
): Promise<string[]> => {
  const entryType = type || "folder";
  const basePath = path.join(process.cwd(), rootPath);
  const entries = await fs.readdir(basePath, { withFileTypes: true });

  const result = entries
    .filter((entry) => {
      if (entryType === "folder") {
        return entry.isDirectory();
      }

      return entry.isFile();
    })
    .map((entry) => entry.name);

  return result;
};

export const getBaseUrl = (serviceName: string): string => {
  const envVar = `${serviceName.toUpperCase()}_SERVICE_BASE_URL`;
  return process.env[envVar] || "";
};
