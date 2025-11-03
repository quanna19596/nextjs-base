import ToolsAPI from "@/app/api/tools/api";
import {
  TCreateServiceResponse,
  TDeleteServiceResponse,
  TFetchServiceResponse,
  TFetchServicesResponse,
  TUpdateServiceResponse,
} from "@/app/api/tools/api/services/types";

export const fetchServices = async (): Promise<TFetchServicesResponse> => {
  const { data } = await ToolsAPI.get<TFetchServicesResponse>("/services");
  return data;
};

export const fetchService = async (name: string): Promise<TFetchServiceResponse> => {
  const { data } = await ToolsAPI.get<TFetchServiceResponse>(`/services/${name}`);
  return data;
};

export const createService = async <T>(body: T): Promise<TCreateServiceResponse> => {
  const { data } = await ToolsAPI.post<TCreateServiceResponse>("/services", body);
  return data;
};

export const updateService = async <T>(name: string, body: T): Promise<TUpdateServiceResponse> => {
  const { data } = await ToolsAPI.patch<TUpdateServiceResponse>(`/services/${name}`, body);
  return data;
};

export const deleteService = async (name: string): Promise<TDeleteServiceResponse> => {
  const { data } = await ToolsAPI.delete<TDeleteServiceResponse>(`/services/${name}`);
  return data;
};
