import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [solidPlugin(), svgr()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
