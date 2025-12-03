import React from "react"

export default function FigmaPreviewコンポーネント(): JSX.Element {
  const embedUrl =
    "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/cC2jsSmd2wU4fWiY4dsd9y/%E3%81%8B%E3%81%BF%E3%81%A3%E3%81%91?node-id=0-1&m=dev"

  return (
    <div className="w-full bg-white rounded-lg shadow p-2 mb-6">
      <h3 className="font-semibold mb-2">Figma プレビュー（埋め込み）</h3>
      <div className="w-full" style={{ height: 450 }}>
        <iframe
          title="Figma Embed"
          src={embedUrl}
          style={{ border: "1px solid rgba(0,0,0,0.08)" }}
          width="100%"
          height="100%"
          allowFullScreen
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">※ Figma の閲覧権限が必要です。</p>
    </div>
  )
}
