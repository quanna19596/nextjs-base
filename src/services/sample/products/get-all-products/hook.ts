import { useMutation } from "@tanstack/react-query";
import getAllProducts from "./api";
import {
  TGetAllProductsRequest,
  TGetAllProductsResponseFailed,
  TGetAllProductsResponseSuccess,
} from "./types";

const useGetAllProducts = () => {
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
