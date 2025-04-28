import SampleService from "@/services/sample";
import {
  TRequestPaths,
  TRequestQueries,
  TRequestBody,
  TResponseSuccess,
  TResponseFailed,
  TRequest,
} from "@/services/sample/types";

export type TGetAllProductsPaths = TRequestPaths<{}>;

export type TGetAllProductsQueries = TRequestQueries<{}>;

export type TGetAllProductsBody = TRequestBody<{}>;

export type TGetAllProductsResponseSuccess = TResponseSuccess<{}>;

export type TGetAllProductsResponseFailed = TResponseFailed<{}>;

export type TGetAllProductsRequest = TRequest<
  TGetAllProductsPaths,
  TGetAllProductsQueries,
  TGetAllProductsBody
>;

const getAllProducts = async (
  request: TGetAllProductsRequest
): Promise<TGetAllProductsResponseSuccess> => {
  const service = await SampleService();
  const response = await service.get(`/products`, { params: request.queries });
  return response.data;
};

export default getAllProducts;
