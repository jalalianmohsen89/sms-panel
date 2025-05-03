import apiService from "@/core/services";
import { FormPropsType } from "../type";

export const loginMobile = (formData: FormPropsType) =>
  apiService.post("auth/login", formData);

export const registerMobile = (formData: FormPropsType) =>
  apiService.post("auth/register", formData);
