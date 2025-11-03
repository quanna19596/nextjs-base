import Service from "@/services/dummy";
import { TLoginRequest, TLoginResponseSuccess } from "./types";

const login = async (request: TLoginRequest): Promise<TLoginResponseSuccess> => {
  const { body } = request;
  const service = await Service();
  const response = await service.post(`/auth/login`, body); // emilys / emilyspass
  return response.data;
};

export default login;
