---
description: "Vite + React + TypeScript環境でのShadcn UI正しいセットアップ方法"
applyTo: "**"
---

# Shadcn UI セットアップ

Vite + React + TypeScript環境での正しいセットアップ方法

## 前提条件
- Vite + React + TypeScript プロジェクト
- Tailwind CSS v4 セットアップ済み

## 必須手順

### 1. TypeScript設定
```json
// tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

```json
// tsconfig.app.json に追加
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

```json
// tsconfig.node.json に追加
{
  "compilerOptions": {
    "types": ["node"]
  }
}
```

### 2. 必要パッケージのインストール
```bash
npm install --save-dev @types/node
```

### 3. Vite設定
```ts
// vite.config.ts
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### 4. Shadcn UI初期化
```bash
npx shadcn@latest init
```

## トラブルシューティング
- "No import alias found" → メインtsconfig.jsonにpaths追加
- "__dirname is not defined" → tsconfig.node.jsonに"types": ["node"]追加
- "Cannot find module 'path'" → `npm install --save-dev @types/node`

## 参考リンク
- [Shadcn UI Vite Installation](https://ui.shadcn.com/docs/installation/vite)
- [Vite Path Alias Configuration](https://vitejs.dev/config/shared-options.html#resolve-alias)