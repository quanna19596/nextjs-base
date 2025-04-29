import getAllProducts, {
  TGetAllProductsRequest,
  TGetAllProductsResponseFailed,
  TGetAllProductsResponseSuccess,
} from "@/services/sample/products/get-all-products";
import { useMutation } from "@tanstack/react-query";

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
