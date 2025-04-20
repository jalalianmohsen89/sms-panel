import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { Toast } from "../components/base";

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
      Cookies.remove("token");
      localStorage.removeItem("token");
      Toast.error("اطلاعات شما منقضی شده است");
      window.location.href = "/auth/login";
      break;
    case 400:
      if (typeof error.response?.data?.message === "string") {
        return Toast.error(error.response.data.message);
      } else {
        return Toast.error(error.response?.data?.message[0]);
      }
    case 403:
      window.location.href = "/error/403";
      break;
    case 404:
      // window.location.href = "/error/404";
      break;
    case 429:
    case 500: {
      window.location.href = "/error/500";
      break;
    }
    }
  } else return Toast.error("خطای داخلی برنامه");
};

export default apiService;
