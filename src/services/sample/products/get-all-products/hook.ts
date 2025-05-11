import { useMutation } from "@tanstack/react-query";

import {
  TGetAllProductsRequest,
  TGetAllProductsResponseFailed,
  TGetAllProductsResponseSuccess,
} from "./types";
import getAllProducts from "./api";

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
