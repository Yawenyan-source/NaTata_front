import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    // alias: {
    //     '@src': '/src/',
    // },
    server: {
        host: 'localhost',
        port: 8080,
        open: false,
        https: true,
        proxy: {
            '/api': {
                ws: false,
                target: 'http://localhost:8081',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
