import React from "react"

export default function FooterCardコンポーネント(): JSX.Element {
  return (
    <div className="mt-12 flex justify-center">
      <div className="w-full max-w-4xl p-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[rgba(0,0,0,0.04)]">
          <div className="text-center">
            <div className="text-sm text-[rgba(27,52,61,0.85)]">法政大学デザイン工学部システムデザイン学科</div>
            <div className="text-xl text-[rgba(27,52,61,0.9)] mt-2">Affective Design Lab</div>
            <div className="text-xs text-[rgba(27,52,61,0.6)] mt-3 tracking-wider">KATO RIHOKO / SUGIYAMA NANA / YOSHIDA YUI</div>

            <div className="my-6" />

            <div className="text-sm text-[rgba(27,52,61,0.7)]">本フォームで収集した情報は研究目的のみに使用します</div>
          </div>
        </div>
      </div>
    </div>
  )
}
