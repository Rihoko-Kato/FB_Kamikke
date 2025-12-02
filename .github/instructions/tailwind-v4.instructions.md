---
description: "Tailwind CSS v4の正しい設定方法"
applyTo: "**"
---

# Tailwind CSS v4 セットアップ

## インストール手順

### 1. パッケージインストール
```bash
npm install tailwindcss @tailwindcss/vite
```

### 2. Vite設定
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 3. CSS設定
```css
/* src/index.css */
@import "tailwindcss";
```

## 従来との違い
- ❌ `npx tailwindcss init -p` 不要
- ❌ `tailwind.config.js` 不要  
- ❌ `@tailwind base/components/utilities` 不要
- ✅ `@tailwindcss/vite` プラグイン使用
- ✅ `@import "tailwindcss"` でインポート

## 動作確認
```tsx
function App() {
  return (
    <h1 className="text-4xl font-bold text-blue-600">
      Tailwind v4 動作中！
    </h1>
  )
}
```

## 参考リンク

- [公式ドキュメント](https://tailwindcss.com/docs/installation/using-vite)