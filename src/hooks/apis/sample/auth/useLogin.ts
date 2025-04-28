import { useMutation } from "@tanstack/react-query";
import login, {
  TLoginRequest,
  TLoginResponseFailed,
  TLoginResponseSuccess,
} from "@/services/sample/auth/login";

const useLogin = () => {
  return useMutation<
    TLoginResponseSuccess,
    TLoginResponseFailed,
    TLoginRequest
  >({
    mutationFn: login,
    onSuccess: () => {},
    onError: () => {},
  });
};

export default useLogin;
