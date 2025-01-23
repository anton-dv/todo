import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import path from "node:path";

// https://vite.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  build: {
    target: "es2015",
    outDir: "dist",
    cssMinify: "esbuild",
    minify: "esbuild",
    rollupOptions: {
      input: path.resolve(import.meta.dirname, "index.html"),
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
  plugins: [react()],
});
