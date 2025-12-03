import React from "react"

export default function アップロードフォームコンポーネント(): JSX.Element {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-2">新しい投稿</h3>

      <form>
        <label className="block text-sm text-gray-700">タイトル</label>
        <input className="w-full border rounded px-3 py-2 mt-1 mb-3" />

        <label className="block text-sm text-gray-700">説明</label>
        <textarea className="w-full border rounded px-3 py-2 mt-1 mb-3" rows={4} />

        <label className="block text-sm text-gray-700">画像</label>
        <input type="file" className="w-full mt-1 mb-3" />

        <button className="w-full bg-blue-600 text-white py-2 rounded">投稿する</button>
      </form>
    </div>
  )
}
