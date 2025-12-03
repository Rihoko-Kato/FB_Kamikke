/// <reference types="vite/client" />

// Vite の import.meta.env に不足している型を補うローカル定義
interface ImportMetaEnv {
  readonly VITE_SHEETS_ENDPOINT?: string
  readonly VITE_SHEETS_TOKEN?: string
  // 将来のカスタム env を許容するためのインデックスシグネチャ
  readonly [key: string]: string | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
