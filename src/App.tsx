import React from "react"
import Headerコンポーネント from "./components/Header"
import Card一覧コンポーネント from "./components/Card一覧"
import アップロードフォームコンポーネント from "./components/UploadForm"
import BackgroundDecorationsコンポーネント from "./components/BackgroundDecorations"
import 神様発見フォームコンポーネント from "./components/FormCard"
import FooterCardコンポーネント from "./components/FooterCard"

export default function App(): JSX.Element {
  return (
    <div className="page-root text-gray-900 p-6">
      <BackgroundDecorationsコンポーネント />

      <main className="max-w-4xl mx-auto mt-12 relative z-10">
        <Headerコンポーネント />

        <div className="mt-8 flex justify-center">
          <神様発見フォームコンポーネント />
        </div>

        <section className="mt-12">
          <Card一覧コンポーネント />
        </section>
        <FooterCardコンポーネント />
      </main>
    </div>
  )
}
