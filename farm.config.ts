import { defineConfig } from "@farmfe/core";
import path from "node:path"
import farmJsPluginPostcss from '@farmfe/js-plugin-postcss';
// https://vitejs.dev/config/
export default defineConfig({
    root: process.cwd(),
    server: {
        host: "localhost",
        hmr: true
    },
    compilation: {
        input: {
            index: './index.html',
        },
        output: {
            path: 'build',
            publicPath: process.env.NODE_ENV === 'production' ? 'https://my-cdn.com' : '/'
        },
        resolve: {
            alias: {
                "@": path.join(process.cwd(), "src"),
            },
        },
        progress: true
    },
    plugins: [farmJsPluginPostcss({
        postcssLoadConfig: {
            // load config from client/postcss.config.js
            path: path.join(process.cwd(), '')
        }
    }), "@farmfe/plugin-react"]
})
