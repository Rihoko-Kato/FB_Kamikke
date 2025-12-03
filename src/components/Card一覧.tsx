import React, { useEffect, useState } from "react"

type 投稿 = {
  id: number
  where: string
  situation: string
  kind: string
  thought: string
  createdAt: string
}

const POSTS_KEY = "kamikke_posts"

function Cardコンポーネント({ data }: { data: 投稿 }) {
  // 各入力項目をラベル付きで見やすく表示する
  const タイトル = data.kind || data.where || `投稿 ${data.id}`
  return (
    <article className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold text-lg text-[rgba(20,40,45,0.95)]">{タイトル}</h3>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[rgba(27,52,61,0.85)]">
        <div className="flex items-center gap-3">
          <svg className="label-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ color: 'var(--kamikke-icon)' }}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
          </svg>
          <div className="break-words text-[rgba(27,52,61,0.9)]">{data.where || '—'}</div>
        </div>

        <div className="flex items-center gap-3">
          <svg className="label-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ color: 'var(--kamikke-icon)' }}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <div className="break-words text-[rgba(27,52,61,0.9)]">{data.situation || '—'}</div>
        </div>

        {/* 'どんな神様' フィールドを表示しない（要望により削除） */}
      </div>

      <div className="mt-3">
        <div className="flex items-start gap-3">
          <svg className="label-icon mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ color: 'var(--kamikke-icon)' }}>
            <g transform="translate(12 12) scale(0.85 1) translate(-12 -12)">
              <path d="M20.8 4.6c-1.6-1.4-4.1-1.2-5.6.4L12 7 8.8 5c-1.5-1.6-4-1.8-5.6-.4C1.2 6 1 8.6 2.6 10.2L12 19l9.4-8.8c1.6-1.6 1.4-4.2-.6-5.6z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </svg>
          <p className="text-sm text-[rgba(27,52,61,0.9)] mt-1 whitespace-pre-wrap">{data.thought || '—'}</p>
        </div>
      </div>
    </article>
  )
}

export default function Card一覧コンポーネント(): JSX.Element {
  const [posts, setPosts] = useState<投稿[]>([])

  function load() {
    try {
      const raw = localStorage.getItem(POSTS_KEY)
      const arr = raw ? JSON.parse(raw) : []
      setPosts(arr)
    } catch (err) {
      console.error(err)
      setPosts([])
    }
  }

  useEffect(() => {
    load()
    const handler = () => load()
    window.addEventListener('kamikke:postsUpdated', handler)
    return () => window.removeEventListener('kamikke:postsUpdated', handler)
  }, [])

  if (!posts || posts.length === 0) return <div />

  return (
    <div className="space-y-4">
      {posts.map((p) => (
        <Cardコンポーネント key={p.id} data={p} />
      ))}
    </div>
  )
}
