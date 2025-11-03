/* eslint-disable @typescript-eslint/no-explicit-any */
export type TService = {
  name: string;
  baseUrl: string;
  camelName: string;
  kebabName: string;
  snakeName: string;
  constantName: string;
  pascalName: string;
  numberOfGroups: number;
  numberOfEndpoints: number;
  numberOfModels: number;
};

export type TGroup = {
  name: string;
};

export type TEndpoint = {};

export type TASTNode = {
  name: string;
  type: "root" | "alias" | "primitive" | "inline";
  optional?: boolean;
  data: string | TASTNode[];
};

export type TResponse<T> = {
  data?: T;
  isSuccess: boolean;
  message: string;
  error?: any;
};
