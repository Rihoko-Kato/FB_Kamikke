import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// @tailwindcss/vite は ESM-only で提供されることがあるため、
// 動的 import を使って読み込むことで esbuild の `require` エラーを回避します。
export default defineConfig(async () => {
  let tailwindcssPlugin: any = undefined
  try {
    // 動的 import で ESM モジュールを安全にロード
    const mod = await import("@tailwindcss/vite")
    tailwindcssPlugin = mod && (mod.default || mod)
  } catch (e) {
    // もし読み込めない場合は無視して続行（Tailwind は postcss 経由で利用可能）
    console.warn("@tailwindcss/vite を読み込めませんでした:", e)
  }

  return {
    plugins: [react(), ...(tailwindcssPlugin ? [tailwindcssPlugin()] : [])],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // 開発中の CORS 問題を回避するために、Vite のプロキシを利用して
    // `/api/sheets` を Apps Script の Web App にフォワードします。
    // 本番ではこのプロキシは使われません。
    server: {
      proxy: {
        '/api/sheets': {
          target: process.env.VITE_SHEETS_ENDPOINT || 'https://script.google.com/macros/s/AKfycbw2I3sBU1knC1J5040kAv6z6346Wjj4V8mLr8jYTY_hpDch1rrVXNvZaGX5qQQ9doUkRQ/exec',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/sheets/, ''),
        },
      },
    },
  }
})
