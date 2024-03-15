import axios from "axios";
import qs from "qs";
import { CookieStorage } from "./cookie-storage";
import { StorageKeys } from "@/constant/storage-keys";
import { API_BASE_URL } from "@/constant";
import { refreshToken } from "@/services/auth";

const axiosConfig = {
  baseURL: API_BASE_URL,
  timeout: 120000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  paramsSerializer: (params: any) =>
    qs.stringify(params, { arrayFormat: "brackets" }),
};

export const request = axios.create(axiosConfig);

request.interceptors.request.use(
  function (config) {
    const accessToken = CookieStorage.getAccessToken();
    if (!!accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const refreshTokenValue = CookieStorage.getRefreshToken();
    if (!!refreshTokenValue) {
      return handleRefreshToken(error.config);
    } else {
      CookieStorage.clearSession();
      //   window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

const handleRefreshToken = async (originRequest: any) => {
  try {
    const refreshTokenValue = CookieStorage.getRefreshToken();
    const res = await refreshToken(refreshTokenValue);
    CookieStorage.setCookieData(StorageKeys.AccessToken, res?.data);
    originRequest._retry = true;
    originRequest.headers.Authorization = res?.data;

    if (originRequest.data) {
      originRequest.data = JSON.parse(originRequest.data);
    }
    return request(originRequest);
  } catch (e) {
    CookieStorage.clearSession();
    // window.location.href = "/";
  }
};
