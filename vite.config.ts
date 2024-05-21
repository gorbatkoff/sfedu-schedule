import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const vitePwaConfig = {
  workbox: {
    globPatterns: ["**/*"],
  },
  // add this to cache all the
  // static assets in the public folder
  includeAssets: ["**/*"],
  manifest: {
    theme_color: "#1e1e1e",
    background_color: "#1A202C",
    display: "standalone",
    scope: "/",
    start_url: "/",
    name: "Sfedu Schedule",
    short_name: "Sfedu Schedule",
    description:
      "Sfedu Schedule это приложение помощник для просмотра расписания студентов ЮФУ",
    icons: [
      {
        src: "images/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "images/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "images/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "images/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "images/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "images/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "images/icons/123123.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "images/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(vitePwaConfig)],
});
