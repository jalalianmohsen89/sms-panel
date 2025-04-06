import apiService from "@/core/services";
import { FormPropsType } from "../type";

export const sendMobile = (formData: FormPropsType) =>
  apiService.post("v1/auth/send-otp", formData);

export const sendOtp = (formData: FormPropsType) =>
  apiService.post("v1/auth/login-with-otp", formData);
