import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { Display, VitePWA } from "vite-plugin-pwa";

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
    display: "standalone" as Display,
    scope: "/",
    start_url: "/",
    name: "Sfedu Schedule",
    short_name: "Sfedu Schedule",
    description:
      "Sfedu Schedule это приложение помощник для просмотра расписания студентов ЮФУ",
    screenshots: [
      {
        src: "/screenshots/desktop.png",
        sizes: "1919x929",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/screenshots/mobile.png",
        sizes: "458x820",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
    icons: [
      {
        src: "icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "icon-144x144.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(vitePwaConfig as any)],
});
