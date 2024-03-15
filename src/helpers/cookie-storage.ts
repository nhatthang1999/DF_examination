import Cookies from "universal-cookie";
import dayjs from "dayjs";
import { StorageKeys } from "@/constant/storage-keys";

let cookies = new Cookies();
export const CookieStorage = {
  getCookieData(key: string) {
    return cookies.get(key);
  },
  setCookieData(key: string, data?: any, path?: string) {
    const expires = dayjs().add(1, "month").toDate();

    return cookies.set(key, data, {
      expires,
      path: path || "/",
    });
  },
  clearCookieData(key: string, path: string) {
    return cookies.remove(key, { path: path || "/" });
  },

  getAccessToken() {
    return cookies.get(StorageKeys.AccessToken);
  },
  getRefreshToken() {
    return cookies.get(StorageKeys.RefreshToken);
  },
  isAuthenticated() {
    return !!cookies.get(StorageKeys.AccessToken);
  },
  clearSession(path?: string) {
    cookies.remove(StorageKeys.AccessToken, { path: path || "/" });
    cookies.remove(StorageKeys.RefreshToken, { path: path || "/" });
  },
};
