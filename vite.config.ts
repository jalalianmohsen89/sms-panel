/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";
import vitePluginImp from "vite-plugin-imp";
import { imagetools } from "vite-imagetools";

// فقط در حالت توسعه visualizer را اضافه کن
// const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    // !isProduction &&
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "bundle-analysis.html",
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: false,
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "brotliCompress",
      ext: ".br",
      deleteOriginFile: false,
    }),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style/index.css`,
        },
      ],
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "logo.svg"],

      manifest: {
        name: "پنل پیامکی",
        short_name: "SMS Panel",
        description: "سامانه ارسال و دریافت پیامک",
        theme_color: "#1677ff", // رنگ اصلی Ant Design
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        screenshots: [
          {
            src: "media/screenshot-desktop.jpg",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "media/screenshot-mobile.jpg",
            sizes: "375x667",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
        icons: [
          { src: "media/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "media/pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "media/pwa-512x512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,woff}"],

        runtimeCaching: [
          {
            urlPattern: /^\/.*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "local-assets",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 روز
              },
            },
          },
        ],
      },
    }),
  ].filter(Boolean),

  build: {
    target: "es2015",
    minify: "esbuild",
    cssCodeSplit: true,
    sourcemap: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"], // React جدا
          antd: ["antd"], // Antd جدا
          zustand: ["zustand"], // مدیریت State جدا
          axios: ["axios"], // کتابخانه Axios جدا
          "react-router-dom": ["react-router-dom"], // Routing جدا
          "react-icons": ["react-icons"], // آیکون‌ها جدا
          "react-inlinesvg": ["react-inlinesvg"], // SVG Loader جدا
          "antd-jalali": ["antd-jalali"], // تقویم جلالی جدا
          "@tanstack/react-query": ["@tanstack/react-query"], // React Query جدا
          "@ant-design/colors": ["@ant-design/colors"], // Ant Design Colors جدا
          "react18-json-view": ["react18-json-view"], // JSON Viewer جدا
          "jalali-plugin-dayjs": ["jalali-plugin-dayjs"], // Day.js Plugin for Jalali Calendar
          "@/core/components/base": ["@/core/components/base"], // Base Components
          "@/core/components/composite/layout": [
            "@/core/components/composite/layout",
          ],
          "@/core/components/composite/data-table": [
            "@/core/components/composite/data-table",
          ], // composite Components
          "@/core/components/composite/page-builder": [
            "@/core/components/composite/page-builder",
          ], // Page Builder Components
        },
      },
    },
  },

  assetsInclude: ["**/*.woff", "**/*.woff2"],
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "panel.sk",
      "simakala.local",
      "192.168.2.91",
    ],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
  },
});
