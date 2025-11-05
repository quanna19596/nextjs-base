import ToolsAPI from "@/app/api/tools/api";
import { TEndpoint, TResponse, TService } from "./types";

export const fetchServices = async (): Promise<TResponse<TService[]>> => {
  const { data } = await ToolsAPI.get<TResponse<TService[]>>("/services");
  return data;
};

export const fetchService = async (name: string): Promise<TResponse<TService>> => {
  const { data } = await ToolsAPI.get<TResponse<TService>>(`/services/${name}`);
  return data;
};

export const createService = async <T>(body: T): Promise<TResponse<TService>> => {
  const { data } = await ToolsAPI.post<TResponse<TService>>("/services", body);
  return data;
};

export const updateService = async <T>(name: string, body: T): Promise<TResponse<TService>> => {
  const { data } = await ToolsAPI.patch<TResponse<TService>>(`/services/${name}`, body);
  return data;
};

export const deleteService = async (name: string): Promise<TResponse<TService>> => {
  const { data } = await ToolsAPI.delete<TResponse<TService>>(`/services/${name}`);
  return data;
};

export const fetchEndpointsByService = async (params: {
  service: string;
}): Promise<TResponse<TEndpoint>> => {
  const { data } = await ToolsAPI.get<TResponse<TEndpoint>>(`/endpoints?service=${params.service}`);
  return data;
};
