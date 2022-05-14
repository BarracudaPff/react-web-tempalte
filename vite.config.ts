import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import ViteFonts from "vite-plugin-fonts";
import {resolve} from "path";
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    plugins: [
        react({
            fastRefresh: process.env.NODE_ENV !== "test"
        }),
        ViteFonts({
            google: {
                families: [
                    {
                        name: "Montserrat",
                        styles: "ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700;1,800"
                    },
                    "Raleway",
                    "Archivo",
                    "Nunito Sans"
                ]
            },
        }),
        svgr({
            exportAsDefault: true,
            esbuildOptions: { loader: 'tsx' }
        }),
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
