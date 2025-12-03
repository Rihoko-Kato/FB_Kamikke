import React, { useEffect, useState, useRef } from "react"

type FormState = {
  where: string
  situation: string
  kind: string
  thought: string
}

const STORAGE_KEY = "kamikke_form"
const POSTS_KEY = "kamikke_posts"

// Apps Script の Web App URL を環境変数で読み込み（なければフォールバック）
const SHEETS_ENDPOINT = (import.meta.env.VITE_SHEETS_ENDPOINT as string) || 'https://script.google.com/macros/s/AKfycbzX2kjY0sT6ZKkDbbpOHAe-J9eN-tDP6dGsidx-I33UXlRVcrxWVACKZkB7-t2MuSHrVA/exec';
const SHEETS_TOKEN = (import.meta.env.VITE_SHEETS_TOKEN as string) || '';
// 開発時には Vite のプロキシを経由して CORS を回避する
const CLIENT_SHEETS_ENDPOINT = import.meta.env.DEV ? '/api/sheets' : SHEETS_ENDPOINT;

async function postToSheets(payload: any) {
  if (!SHEETS_ENDPOINT) return { ok: false, error: 'no endpoint' }
  try {
    // token を付与（空文字なら付けない）
    const body = SHEETS_TOKEN ? { ...payload, token: SHEETS_TOKEN } : payload
    console.log('[Sheets] POST', CLIENT_SHEETS_ENDPOINT, body)
    const res = await fetch(CLIENT_SHEETS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const text = await res.text()
    try {
      const json = JSON.parse(text)
      return { ok: res.ok, status: res.status, data: json }
    } catch (_) {
      return { ok: res.ok, status: res.status, text }
    }
  } catch (err) {
    return { ok: false, error: String(err) }
  }
}

export default function 神様発見フォームコンポーネント(): JSX.Element {
  const [form, setForm] = useState<FormState>({ where: "", situation: "", kind: "", thought: "" })
  const [saved, setSaved] = useState<boolean>(false)
  const firstInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setForm(JSON.parse(raw))
    } catch (e) {
      // ignore
    }
  }, [])

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((s) => ({ ...s, [key]: value }))
    setSaved(false)
  }
  const [sheetsStatus, setSheetsStatus] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      // 保存: 単体フォームの保存（フォーム復元用）
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form))

      // 投稿リストに追加
      try {
        const raw = localStorage.getItem(POSTS_KEY)
        const posts = raw ? JSON.parse(raw) : []
        const item = { id: Date.now(), where: form.where, situation: form.situation, kind: form.kind, thought: form.thought, createdAt: new Date().toISOString() }
        posts.unshift(item)
        localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
        // 他のコンポーネントへ通知（同一ウィンドウ内でも反映させるため）
        window.dispatchEvent(new CustomEvent('kamikke:postsUpdated'))
        // Apps Script (Google Sheets) にも送信を試みる（失敗しても localStorage 側は保持）
        try {
          setSheetsStatus('送信中...')
          const sheetsRes = await postToSheets(item)
          if (!sheetsRes || sheetsRes.ok === false) {
            console.error('Sheets save failed', sheetsRes)
            // サーバ側のエラー内容があれば表示してデバッグを助ける
            const serverMsg = sheetsRes && (sheetsRes.data?.error || sheetsRes.text || sheetsRes.error) ?
              (sheetsRes.data?.error || sheetsRes.text || sheetsRes.error) : '不明なエラー'
            setSheetsStatus(`Sheets への保存に失敗しました: ${serverMsg}`)
          } else {
            console.log('Sheets saved', sheetsRes)
            setSheetsStatus('Sheets へ保存しました')
          }
        } catch (e) {
          console.error('Sheets post error', e)
          setSheetsStatus('Sheets への保存に失敗しました')
        }
      } catch (err) {
        console.error('posts save err', err)
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
      // 送信後はフォームをクリアする
      setForm({ where: '', situation: '', kind: '', thought: '' })
      // 次の入力をすぐ始められるように、先頭の入力へフォーカスを当てる
      setTimeout(() => {
        try {
          firstInputRef.current?.focus()
          // 既存テキストが選択されている場合に備えて select() も呼ぶ
          if (firstInputRef.current && typeof firstInputRef.current.select === 'function') {
            firstInputRef.current.select()
          }
        } catch (err) {
          // ignore focus errors
        }
      }, 0)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-full max-w-xl relative">
      <div className="bg-[#B8C5C9] rounded-2xl shadow-xl border border-[rgba(0,0,0,0.06)] p-6 relative overflow-hidden">
        {/* 小さな角の飾り */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-[rgba(255,255,255,0.6)] rounded-tr-lg" />
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-[rgba(255,255,255,0.6)] rounded-tl-lg" />

        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 bg-white/40 rounded-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14 8L20 9L15 13L16 19L12 16L8 19L9 13L4 9L10 8L12 2Z" fill="#2b5966" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[rgba(27,52,61,0.9)]">神様を見つけました</h3>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-[rgba(27,52,61,0.85)] flex items-center gap-2" style={{ color: 'var(--kamikke-icon)' }}>
              <svg className="label-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
              </svg>
              <span>どこで見つけた？</span>
            </label>
            <input
              value={form.where}
              onChange={(e) => update("where", e.target.value)}
              ref={firstInputRef}
              placeholder="例：朝の通学路、家族との食卓、図書館..."
              className="w-full mt-2 px-4 py-3 rounded-lg border border-white bg-white shadow-inner text-sm"
            />
            
          </div>

          <div>
            <label className="text-sm text-[rgba(27,52,61,0.85)] flex items-center gap-2" style={{ color: 'var(--kamikke-icon)' }}>
              <svg className="label-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span>どんな状況だった？</span>
            </label>
            <input
              value={form.situation}
              onChange={(e) => update("situation", e.target.value)}
              placeholder="例：むかしの知人と遭遇した、忘れ物に気づいた..."
              className="w-full mt-2 px-4 py-3 rounded-lg border border-white bg-white shadow-inner text-sm"
            />
                {sheetsStatus && (
                  <div className="absolute right-4 top-14 bg-white/90 text-sm text-[rgba(20,40,45,0.9)] px-3 py-1 rounded">{sheetsStatus}</div>
                )}
            
          </div>

          <div>
            <label className="text-sm text-[rgba(27,52,61,0.85)] flex items-center gap-2" style={{ color: 'var(--kamikke-icon)' }}>
              <svg className="label-icon w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 2l1.5 3 3 1-3 1-1.5 3-1.5-3-3-1 3-1 1.5-3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span>どんな神様？</span>
            </label>
            <input
              value={form.kind}
              onChange={(e) => update("kind", e.target.value)}
              placeholder="例：絶妙に気まずい知人と会わせる神様..."
              className="w-full mt-2 px-4 py-3 rounded-lg border border-white bg-white shadow-inner text-sm"
            />
            
          </div>

          <div>
            <label className="text-sm text-[rgba(27,52,61,0.85)] flex items-center gap-2" style={{ color: 'var(--kamikke-icon)' }}>
              <svg className="label-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <g transform="translate(12 12) scale(0.85 1) translate(-12 -12)">
                  <path d="M20.8 4.6c-1.6-1.4-4.1-1.2-5.6.4L12 7 8.8 5c-1.5-1.6-4-1.8-5.6-.4C1.2 6 1 8.6 2.6 10.2L12 19l9.4-8.8c1.6-1.6 1.4-4.2-.6-5.6z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </g>
              </svg>
              <span>その時どう思った？</span>
            </label>
            <textarea
              value={form.thought}
              onChange={(e) => update("thought", e.target.value)}
              placeholder="例：もっと仲良くなれるかも？..."
              rows={6}
              className="w-full mt-2 px-4 py-3 rounded-lg border border-white bg-white shadow-inner text-sm"
            />
            
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-b from-[rgba(43,89,102,0.92)] to-[rgba(43,89,102,0.82)] text-white rounded-2xl shadow-[0_8px_24px_rgba(43,89,102,0.18)] hover:brightness-105 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14 8L20 9L15 13L16 19L12 16L8 19L9 13L4 9L10 8L12 2Z" fill="white" />
              </svg>
              <span className="font-medium">記録する</span>
            </button>
          </div>
        </form>

        {/* ページインジケータは不要とのことなので削除しました */}

        {/* 保存トースト */}
        {saved && (
          <div className="absolute right-4 top-4 bg-white/90 text-sm text-[rgba(20,40,45,0.9)] px-3 py-1 rounded">保存しました</div>
        )}
      </div>
    </div>
  )
}
