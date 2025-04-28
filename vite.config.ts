/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";

// فقط در حالت توسعه visualizer را اضافه کن
// const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [
    react(),
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
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "My React App",
        short_name: "MyApp",
        description: "My Awesome React Application",
        theme_color: "#ffffff",
        // آیکون‌ها رو اگر نیاز داری از کامنت در بیار و فایل‌هاشو بذار توی public
        // icons: [
        // eslint-disable-next-line no-irregular-whitespace
        //   { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
        // eslint-disable-next-line no-irregular-whitespace
        //   { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
        // eslint-disable-next-line max-len, no-irregular-whitespace
        //   { src: "pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
        // ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"], // مطمئن شو فونت‌ها هم کش می‌شن
        runtimeCaching: [
          // ... (کش کردن فونت‌های گوگل)
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }, // 1 سال
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }, // 1 سال
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ].filter(Boolean),
  // ... existing code ...
  build: {
    target: "es2015",
    minify: "esbuild",
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          antd: ["antd"],
        },
      },
    },
  },

  // ... existing code ...
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
