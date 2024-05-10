import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    envCompatible({
      // Ruta al archivo .env que contiene las variables de entorno
      filepath: path.resolve(__dirname, '.env')
  })
  ]
})
