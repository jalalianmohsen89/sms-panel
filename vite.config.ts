/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // اجازه دسترسی از هر IP
    port: 5173, // پورت پیش‌فرض Vite (اختیاری)
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "panel.sk",
      "simakala.local",
      "192.168.2.91" // IP سیستم شما
    ]
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  test: {
    environment: "jsdom",
    globals: true, // برای استفاده از global test و expect
    setupFiles: "./src/setupTests.js" // فایل تنظیمات اولیه تست
  }
});
