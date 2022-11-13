/// <reference types="vite-plugin-pwa/client" />

declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "*.png" {
    const content: any;
    export default content;
}

declare module 'sockjs-client/dist/sockjs'
