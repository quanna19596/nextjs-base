import { TResponse, TService } from "@/app/api/tools/(common)/types";

export type TFetchServicesResponse = TResponse<TService[]>;

export type TFetchServiceResponse = TResponse<TService>;

export type TCreateServiceResponse = TResponse<TService>;

export type TDeleteServiceResponse = TResponse<TService>;

export type TUpdateServiceResponse = TResponse<TService>;
