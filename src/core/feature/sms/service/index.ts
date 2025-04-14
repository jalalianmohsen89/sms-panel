import apiService from "@/core/services";

export const userNumberList = () => apiService.get("user-number/list");

export const sendPersonalSms = (data: any) => apiService.post("sms/send", data);

export const uploadFileSms = (data: any) =>
  apiService.post("sms/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

export const previewFile = (data: any) =>
  apiService.post("sms/upload/preview", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
