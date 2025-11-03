import Service from "@/services/dummy";
import { TGetAllProductsRequest, TGetAllProductsResponseSuccess } from "./types";

const getAllProducts = async (
  request: TGetAllProductsRequest,
): Promise<TGetAllProductsResponseSuccess> => {
  const service = await Service();
  const response = await service.get(`/products`, { params: request.queries });
  return response.data;
};

export default getAllProducts;
