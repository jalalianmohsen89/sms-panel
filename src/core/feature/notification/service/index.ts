import apiService from "@/core/services";

export const uploadFileNotif = (data: any) =>
  apiService.post("push/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const previewFileNotif = (data: any) =>
  apiService.post("push/upload/preview", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
