import { VitePWA } from "vite-plugin-pwa";

export const vitePwa = () => {
  return VitePWA({
    workbox: {
      globPatterns: ["**/*"],
    },
    includeAssets: ["**/*"],
    manifest: {
      theme_color: "#1e1e1e",
      background_color: "#B100FF",
      display: "standalone",
      scope: "/",
      start_url: "/",
      name: "Sfedu Schedule",
      short_name: "Sfedu Schedule",
      description:
        "Sfedu Schedule это приложение помощник для просмотра расписания студентов ЮФУ",
      icons: [
        {
          src: "/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icon-256x256.png",
          sizes: "256x256",
          type: "image/png",
        },
        {
          src: "/icon-384x384.png",
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: "/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  });
};