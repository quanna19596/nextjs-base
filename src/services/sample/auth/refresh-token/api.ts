import SampleService from "@/services/sample";
import { TRefreshTokenRequest, TRefreshTokenResponseSuccess } from "./types";

const refreshToken = async (
  request: TRefreshTokenRequest,
): Promise<TRefreshTokenResponseSuccess> => {
  const { body } = request;
  const service = await SampleService();
  const response = await service.post(`/auth/refresh`, body);
  return response.data;
};

export default refreshToken;
