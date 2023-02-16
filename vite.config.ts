import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import ViteFonts from "vite-plugin-fonts";
import {resolve} from "path";

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    plugins: [
        react({
            fastRefresh: process.env.NODE_ENV !== "test"
        }),
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
