/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MAPS_API: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}