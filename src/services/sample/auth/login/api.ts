import SampleService from "@/services/sample";
import { TLoginRequest, TLoginResponseSuccess } from "./types";

const login = async (request: TLoginRequest): Promise<TLoginResponseSuccess> => {
  const { body } = request;
  const service = await SampleService();
  const response = await service.post(`/auth/login`, body); // emilys / emilyspass
  return response.data;
};

export default login;
