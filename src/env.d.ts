interface MetaEnv {
    readonly VITE_API_CLIENT_BASEURL: string;
    readonly VITE_API_MESSAGING_TOKEN: string;
}

interface ImportMeta {
    readonly env: MetaEnv
}