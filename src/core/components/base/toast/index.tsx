// Toast.ts
import { notification, NotificationArgsProps } from "antd";

// تعریف تایپ‌ها
type ToastType = "success" | "error" | "info" | "warning";

type ToastOptions = {
  duration?: number; // مدت زمان (پیش‌فرض: 4.5 ثانیه)
  placement?: NotificationArgsProps["placement"]; // موقعیت (پیش‌فرض: topRight)
  style?: React.CSSProperties; // استایل سفارشی
  className?: string; // کلاس سفارشی
  key?: string; // کلید منحصربه‌فرد
  description?: string; // توضیحات
};

// تابع برای ساخت کلید تصادفی
const generateKey = () => Math.random().toString(36).substring(7);

// کانفیگ اولیه notification با تم
const initializeToast = () => {
  // اینجا تم اختصاصی پروژه رو فرض می‌کنیم
  // می‌تونی این رو از ConfigProvider یا یه فایل تنظیمات بگیری
  const customThemeStyles = {
    success: {
      backgroundColor: "#e6ffe6", // سبز خیلی ملایم
      color: "#2d862d", // سبز تیره‌تر برای متن
      border: "1px solid #b3ffb3", // سبز روشن‌تر برای خط دور
    },
    error: {
      backgroundColor: "#ffe6e6", // قرمز خیلی ملایم
      color: "#b32424", // قرمز تیره‌تر برای متن
      border: "1px solid #ffcccc", // قرمز روشن‌تر برای خط دور
    },
    info: {
      backgroundColor: "#e6f7ff", // آبی خیلی ملایم
      color: "#1a75ff", // آبی متوسط برای متن
      border: "1px solid #cceeff", // آبی روشن‌تر برای خط دور
    },
    warning: {
      backgroundColor: "#fff5e6", // نارنجی/زرد خیلی ملایم
      color: "#e68a00", // نارنجی تیره‌تر برای متن
      border: "1px solid #ffe6cc", // نارنجی روشن‌تر برای خط دور
    },
  };

  const showToast = (
    type: ToastType,
    message: string,
    options?: ToastOptions,
  ) => {
    notification[type]({
      message,
      description: options?.description || "",
      duration: options?.duration ?? 4.5,
      placement: options?.placement ?? "topLeft",
      style: { ...customThemeStyles[type], ...options?.style }, // ترکیب تم با استایل سفارشی
      className: options?.className || "custom-toast",
      key: options?.key ?? generateKey(),
    });
  };

  return {
    show: showToast,
    success: (message: string, options?: ToastOptions) =>
      showToast("success", message, options),
    error: (message: string, options?: ToastOptions) =>
      showToast("error", message, options),
    info: (message: string, options?: ToastOptions) =>
      showToast("info", message, options),
    warning: (message: string, options?: ToastOptions) =>
      showToast("warning", message, options),
  };
};

// ساخت نمونه Toast با تم
export const Toast = initializeToast();
