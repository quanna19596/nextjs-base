import fs from "fs/promises";
import path from "path";
import { Project, PropertySignature, SyntaxKind, TypeAliasDeclaration, TypeNode } from "ts-morph";
import { ERootDir } from "./enums";
import { TASTNode, TResponse, TService } from "./types";

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
  const envVar = `${getNamingCases(serviceName).constantName}_SERVICE_BASE_URL`;
  return process.env[envVar] || "";
};

export const removeVietnameseAccents = (str: string): string => {
  let content = str;
  content = content.toLowerCase();
  content = content.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  content = content.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  content = content.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  content = content.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  content = content.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  content = content.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  content = content.replace(/đ/g, "d");
  content = content.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  content = content.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return content;
};

export const getNamingCases = (
  serviceName: string,
): {
  camelName: string;
  kebabName: string;
  snakeName: string;
  constantName: string;
  pascalName: string;
} => {
  const noAccentsServiceName = removeVietnameseAccents(serviceName);

  const words = noAccentsServiceName
    .replace(/[-_]+/g, " ")
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const lower = words.map((w) => w.toLowerCase());
  const pascal = lower.map((w) => w.charAt(0).toUpperCase() + w.slice(1));

  return {
    camelName: pascal.join("").replace(/^[A-Z]/, (c) => c.toLowerCase()),
    kebabName: lower.join("-"),
    snakeName: lower.join("_"),
    constantName: lower.join("_").toUpperCase(),
    pascalName: pascal.join(""),
  };
};

export const getApiFiles = async (dir: string): Promise<string[]> => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let result: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      result = result.concat(await getApiFiles(fullPath));
    } else if (entry.isFile() && entry.name === "api.ts") {
      result.push(fullPath);
    }
  }

  return result;
};

export const getTypesFromFile = (filePath: string): TASTNode[] => {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);

  const result: TASTNode[] = [];

  function isOptionalType(typeNode: TypeNode): boolean {
    if (typeNode.getKind() === SyntaxKind.UnionType) {
      const unionTypes = typeNode
        .getText()
        .split("|")
        .map((t) => t.trim());
      return unionTypes.includes("null") || unionTypes.includes("undefined");
    }
    return false;
  }

  function getCleanedTypeName(typeNode: TypeNode): string {
    let typeText = typeNode.getText();

    // Remove null and undefined from union
    if (typeNode.getKind() === SyntaxKind.UnionType) {
      const unionTypes = typeText
        .split("|")
        .map((t) => t.trim())
        .filter((t) => t !== "null" && t !== "undefined");

      if (unionTypes.length === 1) {
        typeText = unionTypes[0];
      }
    }

    return typeText;
  }

  function isPrimitiveType(typeName: string): boolean {
    const primitives = [
      "string",
      "number",
      "boolean",
      "any",
      "unknown",
      "void",
      "never",
      "bigint",
      "symbol",
    ];

    // Check if it's a basic primitive
    if (primitives.includes(typeName)) {
      return true;
    }

    // Check if it's an array or other built-in types
    if (
      typeName.endsWith("[]") ||
      typeName.startsWith("Array<") ||
      typeName.startsWith("Date") ||
      typeName.startsWith("RegExp") ||
      typeName.startsWith("Promise<") ||
      typeName.startsWith("Map<") ||
      typeName.startsWith("Set<")
    ) {
      return true;
    }

    return false;
  }

  function parseTypeNode(propertyName: string, typeNode: TypeNode, isOptional: boolean): TASTNode {
    const hasOptionalInType = isOptionalType(typeNode);
    const finalOptional = isOptional || hasOptionalInType;

    // If it's a union with null/undefined, extract the actual type
    let actualTypeNode = typeNode;
    if (typeNode.getKind() === SyntaxKind.UnionType) {
      const unionType = typeNode.asKindOrThrow(SyntaxKind.UnionType);
      const types = unionType.getTypeNodes();

      // Filter out null and undefined
      const nonNullableTypes = types.filter((t) => {
        const text = t.getText();
        return text !== "null" && text !== "undefined";
      });

      if (nonNullableTypes.length === 1) {
        actualTypeNode = nonNullableTypes[0];
      }
    }

    // Check for inline object type (TypeLiteral)
    if (actualTypeNode.getKind() === SyntaxKind.TypeLiteral) {
      const children: TASTNode[] = [];

      const typeLiteral = actualTypeNode.asKindOrThrow(SyntaxKind.TypeLiteral);
      const members = typeLiteral.getMembers();

      members.forEach((member) => {
        if (member.getKind() === SyntaxKind.PropertySignature) {
          const propSig = member as PropertySignature;
          const memberName = propSig.getName();
          const memberType = propSig.getTypeNode();
          const memberOptional = propSig.hasQuestionToken();

          if (memberType) {
            children.push(parseTypeNode(memberName, memberType, memberOptional));
          }
        }
      });

      const node: TASTNode = {
        name: propertyName,
        type: "inline",
        data: children,
      };
      if (finalOptional) node.optional = true;
      return node;
    }

    const cleanedTypeName = getCleanedTypeName(actualTypeNode);

    // Check for primitive types
    if (isPrimitiveType(cleanedTypeName)) {
      const node: TASTNode = {
        name: propertyName,
        type: "primitive",
        data: cleanedTypeName,
      };
      if (finalOptional) node.optional = true;
      return node;
    }

    // Otherwise it's an alias
    const node: TASTNode = {
      name: propertyName,
      type: "alias",
      data: cleanedTypeName,
    };
    if (finalOptional) node.optional = true;
    return node;
  }

  // Get all type alias declarations
  const typeAliases = sourceFile.getTypeAliases();

  typeAliases.forEach((typeAlias: TypeAliasDeclaration) => {
    const typeName = typeAlias.getName();
    const typeNode = typeAlias.getTypeNode();

    if (typeNode && typeNode.getKind() === SyntaxKind.TypeLiteral) {
      const children: TASTNode[] = [];

      const typeLiteral = typeNode.asKindOrThrow(SyntaxKind.TypeLiteral);
      const members = typeLiteral.getMembers();

      members.forEach((member) => {
        if (member.getKind() === SyntaxKind.PropertySignature) {
          const propSig = member as PropertySignature;
          const propertyName = propSig.getName();
          const propertyType = propSig.getTypeNode();
          const isOptional = propSig.hasQuestionToken();

          if (propertyType) {
            children.push(parseTypeNode(propertyName, propertyType, isOptional));
          }
        }
      });

      result.push({
        name: typeName,
        type: "root",
        data: children,
      });
    }
  });

  return result;
};

export const deleteFolder = async (folderName: string): Promise<void> => {
  const folderPath = path.resolve(process.cwd(), folderName);
  await fs.rm(folderPath, { recursive: true, force: true });
};

export const replaceInFile = async (
  filePath: string,
  replacements: { [key: string]: string },
): Promise<void> => {
  try {
    let content = await fs.readFile(filePath, "utf-8");
    for (const [oldText, newText] of Object.entries(replacements)) {
      content = content.replaceAll(oldText, newText);
    }
    await fs.writeFile(filePath, content, "utf-8");
  } catch (error) {
    console.error(error);
  }
};

export const apiWrapper = async <T>(handler: () => Promise<T>): Promise<TResponse<T>> => {
  try {
    const resp = await handler();
    return { message: "", isSuccess: true, ...resp };
  } catch (error) {
    return { isSuccess: false, message: "Something went wrong!", error };
  }
};

export const generateServiceRecord = async (serviceName: string): Promise<TService> => ({
  name: serviceName,
  baseUrl: getBaseUrl(serviceName),
  ...getNamingCases(serviceName),
  numberOfGroups: (await getDirectlyEntries(`${ERootDir.SERVICES}/${serviceName}`)).length,
  numberOfEndpoints: (await getApiFiles(`${ERootDir.SERVICES}/${serviceName}`)).length,
  numberOfModels: getTypesFromFile(`${ERootDir.SERVICES}/${serviceName}/models.d.ts`).length,
});
