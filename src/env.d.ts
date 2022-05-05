interface ImportMetaEnv {
    readonly VITE_API_HTTP_BASE: string
    readonly VITE_API_IMG_HTTP_BASE: string
    readonly VITE_API_HTTP_TEST_TOKEN?: string
    readonly VITE_DEV: string
    readonly NODE_ENV: string

}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
