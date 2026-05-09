import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],


    server: {
    proxy: {
      "/openaq": {
        target: "https://api.openaq.org",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/openaq/, "")
      }
    }
  },

  base: "/",


})
