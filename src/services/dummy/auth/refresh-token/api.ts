import Service from "@/services/dummy";
import { TRefreshTokenRequest, TRefreshTokenResponseSuccess } from "./types";

const refreshToken = async (
  request: TRefreshTokenRequest,
): Promise<TRefreshTokenResponseSuccess> => {
  const { body } = request;
  const service = await Service();
  const response = await service.post(`/auth/refresh`, body);
  return response.data;
};

export default refreshToken;
