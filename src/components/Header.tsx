import React from "react"

export default function Headerコンポーネント(): JSX.Element {
  return (
    <header className="text-center">
      <div className="relative inline-block">
        <h1
          className="text-8xl leading-tight text-[rgba(20,40,45,0.95)] font-normal"
          style={{ fontFamily: "'Zen Maru Gothic', 'Noto Sans JP', sans-serif" }}
        >
          かみっけ
        </h1>
        {/* タイトル下の横棒は削除（要求により） */}
      </div>

      <p className="max-w-2xl mx-auto text-base text-[rgba(20,40,45,0.8)] mt-6 whitespace-pre-line text-center">
        {`この度は「おもいが流れる回路展」へのご来場、誠にありがとうございました。
"かみっけ"の展示をご覧になり、「神様がいるかもしれないと思って日常を見た時、どんなことを思ったか」、その率直なご感想をぜひお聞かせください。
私たちの展示が、あなたの日常の見え方を少しでも変えるきっかけになっていれば幸いです。
皆さまの貴重な視点と発見を、心よりお待ちしております。`}
      </p>
    </header>
  )
}
