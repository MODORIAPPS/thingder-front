interface MetaEnv {
    readonly VITE_API_CLIENT_BASEURL: string;
}

interface ImportMeta {
    readonly env: MetaEnv
}