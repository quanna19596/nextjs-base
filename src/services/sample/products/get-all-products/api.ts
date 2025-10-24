import SampleService from "@/services/sample";
import { TGetAllProductsRequest, TGetAllProductsResponseSuccess } from "./types";

const getAllProducts = async (
  request: TGetAllProductsRequest,
): Promise<TGetAllProductsResponseSuccess> => {
  const service = await SampleService();
  const response = await service.get(`/products`, { params: request.queries });
  return response.data;
};

export default getAllProducts;
