import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePwa } from "./src/shared/plugins/vitePwa";

export default defineConfig({
  plugins: [react(), vitePwa()],
});
