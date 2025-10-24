import { TProduct } from "@/services/sample/products/types";
import {
  TRequest,
  TRequestBody,
  TRequestPaths,
  TRequestQueries,
  TResponseFailed,
  TResponseSuccess,
} from "@/services/sample/types";

export type TGetAllProductsPaths = TRequestPaths<{}>;

export type TGetAllProductsQueries = TRequestQueries<{
  pageNum?: number;
  pageSize?: number;
}>;

export type TGetAllProductsBody = TRequestBody<{}>;

export type TGetAllProductsResponseSuccess = TResponseSuccess<{
  products: TProduct[];
}>;

export type TGetAllProductsResponseFailed = TResponseFailed<{}>;

export type TGetAllProductsRequest = TRequest<
  TGetAllProductsPaths,
  TGetAllProductsQueries,
  TGetAllProductsBody
>;
