import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  build: {
    outDir: "C:/Users/AN/Desktop/todo/dist",
    cssMinify: "esbuild",
    minify: "esbuild",
    rollupOptions: {
      input: "./index.html",
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
  plugins: [react()],
});
