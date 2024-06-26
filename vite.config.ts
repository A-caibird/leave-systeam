import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "node:path"
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0"
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, "src")
        }
    },
    optimizeDeps: { esbuildOptions: { target: "esnext" } },
    build:{
        target: "ESNext"
    }
})
