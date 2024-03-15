import { API_BASE_URL } from "@/constant";
import { request } from "@/helpers/request";

export const login = (credentials: any) =>
  request.post(API_BASE_URL + "/auth/login", credentials);

export const refreshToken = (refreshToken: string) =>
  request.post(API_BASE_URL + "/auth/refresh-token", { refreshToken });
