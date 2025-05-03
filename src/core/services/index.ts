import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { Toast } from "@/core/components/base/toast";
import { goTo } from "../navigation";
import useStore from "@/core/store";

const apiService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // api base_url
  timeout: 120000, // request timeout,
});

apiService.interceptors.request.use(
  (req) => {
    req.headers["Authorization"] =
      `Bearer ${Cookies.get("token") || localStorage.getItem("token")}`;

    return req;
  },
  (error) => Promise.reject(error),
);

apiService.interceptors.response.use(
  (res) => res,
  (error) => catcherServerApi(error),
);

const catcherServerApi = (error: unknown) => {
  if (error instanceof AxiosError) {
    switch (error.response?.status || error.status) {
    case 401:
      Toast.error("اطلاعات شما منقضی شده است");
      useStore.getState().logout();
      break;
    case 400:
      if (typeof error.response?.data?.message === "string") {
        return Toast.error(error.response.data.message);
      } else {
        return Toast.error(error.response?.data?.message[0]);
      }
    case 403:
      goTo("/error/403");
      break;
    case 404:
      goTo("/error/404");
      break;
    case 429:
    case 500: {
      goTo("/error/500");
      break;
    }
    }
  } else return Toast.error("خطای داخلی برنامه");
};

export default apiService;
