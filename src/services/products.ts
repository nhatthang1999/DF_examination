import { API_BASE_URL } from "@/constant";
import { request } from "@/helpers/request";

export const getProducts = () => request.get(API_BASE_URL + "/projects");
