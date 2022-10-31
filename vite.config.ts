import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
  strategies: "generateSW",
  // registerType: "autoUpdate",
  // srcDir: "src",
  // filename: "firebase-messaging-sw.js",
  devOptions: {
    enabled: process.env.DEV === "true"
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions)],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  server: {
    port: 3000
  }
})
