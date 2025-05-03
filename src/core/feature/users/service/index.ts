import apiService from "@/core/services";

export const registerUser = (formData: any) =>
  apiService.post("auth/register", formData);

export const assingUser = (formData: any) =>
  apiService.post("user-number/create", formData);

export const setWebHook = (data: any) =>
  apiService.put("user-number/update", data);
