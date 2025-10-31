import { UseMutationResult, useMutation } from "@tanstack/react-query";
import getAllProducts from "./api";
import {
  TGetAllProductsRequest,
  TGetAllProductsResponseFailed,
  TGetAllProductsResponseSuccess,
} from "./types";

const useGetAllProducts = (): UseMutationResult<
  TGetAllProductsResponseSuccess,
  TGetAllProductsResponseFailed,
  TGetAllProductsRequest
> => {
  return useMutation<
    TGetAllProductsResponseSuccess,
    TGetAllProductsResponseFailed,
    TGetAllProductsRequest
  >({
    mutationFn: getAllProducts,
    onSuccess: () => {},
    onError: () => {},
  });
};

export default useGetAllProducts;
