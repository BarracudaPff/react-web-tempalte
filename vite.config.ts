import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteFonts from "vite-plugin-fonts";
import { resolve } from "path";

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    plugins: [
        react(),
        ViteFonts({
            google: {
                families: []
            },
        })
    ],
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import "${resolve(__dirname, "theme.less")}";`
                },
                javascriptEnabled: true,
            }
        }
    },

    resolve: {
        alias: [
            { find: "src", replacement: resolve(__dirname, "src") },
            { find: /^~/, replacement: "" },
            { find: "react/jsx-runtime", replacement: "react/jsx-runtime.js" },
        ]
    },

    server: {
        port: 8080
    },

    build: {
        outDir: "build",
        commonjsOptions: {
            include: []
        }
    },
});
