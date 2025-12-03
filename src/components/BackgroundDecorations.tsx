import React, { useEffect, useRef } from "react"

export default function BackgroundDecorationsコンポーネント(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const motifPositions: Array<{ left: string; top: string; size: number; color: string; opacity: number }> = [
    { left: '8%', top: '10%', size: 12, color: '#B8C5C9', opacity: 0.9 },
    { left: '18%', top: '22%', size: 20, color: '#E5D4B8', opacity: 0.85 },
    { left: '28%', top: '14%', size: 16, color: '#D4B5B0', opacity: 0.8 },
    { left: '38%', top: '30%', size: 36, color: '#B8C5C9', opacity: 0.9 },
    { left: '52%', top: '24%', size: 52, color: '#E5D4B8', opacity: 0.88 },
    { left: '66%', top: '18%', size: 18, color: '#D4B5B0', opacity: 0.8 },
    { left: '75%', top: '36%', size: 64, color: '#B8C5C9', opacity: 0.9 },
    { left: '82%', top: '54%', size: 26, color: '#E5D4B8', opacity: 0.78 },
    { left: '68%', top: '68%', size: 16, color: '#D4B5B0', opacity: 0.75 },
    { left: '50%', top: '78%', size: 44, color: '#B8C5C9', opacity: 0.88 },
    { left: '32%', top: '72%', size: 22, color: '#E5D4B8', opacity: 0.8 },
    { left: '14%', top: '60%', size: 30, color: '#D4B5B0', opacity: 0.82 },
  ]

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const nodes = Array.from(
      el.querySelectorAll<HTMLElement>(
        '.float-slow, .float-medium, .float-fast, .float-strong, .bg-motif, img'
      )
    )

    nodes.forEach((n, i) => {
      const delay = (Math.random() * 6).toFixed(2) + 's'
      // base duration by class, then randomize
      const baseDur = n.classList.contains('float-fast')
        ? 4.8
        : n.classList.contains('float-medium')
        ? 7
        : n.classList.contains('float-strong')
        ? 9
        : 10
      const dur = (baseDur * (0.7 + Math.random() * 0.8)).toFixed(2) + 's'

      n.style.animationDelay = delay
      n.style.animationDuration = dur

      // small random translate and rotate to make motion less uniform
      const tx = (Math.random() * 24 - 12).toFixed(2) + 'px'
      const ty = (Math.random() * 24 - 12).toFixed(2) + 'px'
      const rotate = (Math.random() * 8 - 4).toFixed(2) + 'deg'

      const existing = n.style.transform || ''
      // some elements already have translate(-50%,-50%), preserve it
      n.style.transform = `${existing} translate3d(${tx}, ${ty}, 0) rotate(${rotate})`

      // tiny opacity variation for natural feel
      const currentOpacity = parseFloat(n.style.opacity || (n.getAttribute('data-opacity') || '1'))
      const newOpacity = Math.max(0.4, Math.min(1, currentOpacity * (0.82 + Math.random() * 0.36)))
      n.style.opacity = String(newOpacity)
    })
  }, [])

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 中央に密集させず、画面四隅と中間に散らすレイアウトに変更 */}

      {/* Top-left cluster */}
      <img src="/assets/decor/dot-blue.svg" alt="dot-tl" className="absolute left-8 top-12 w-44 opacity-95 float-medium" />
      <img src="/assets/decor/dot-yellow.svg" alt="dot-tl-small" className="absolute left-24 top-36 w-16 opacity-80 float-fast" />

      {/* Top-right cluster */}
      <img src="/assets/decor/dot-yellow.svg" alt="dot-tr" className="absolute right-8 top-14 w-48 opacity-95 float-medium" />
      <img src="/assets/decor/dot-pink.svg" alt="dot-tr-small" className="absolute right-28 top-40 w-18 opacity-82 float-fast" />

      {/* Middle-left (少しサイズを抑えて左右に拡散) */}
      <img src="/assets/decor/dot-pink.svg" alt="dot-ml" className="absolute left-6 top-1/3 w-40 opacity-85 float-medium" />
      <img src="/assets/decor/dot-blue.svg" alt="dot-ml-small" className="absolute left-16 top-2/5 w-14 opacity-75 float-fast" />

      {/* Middle-right を画面端寄りに移動し小さめに調整 */}
      <img src="/assets/decor/dot-blue.svg" alt="dot-mr" className="absolute right-6 top-[36%] w-20 opacity-88 float-medium" />
      <img src="/assets/decor/dot-yellow.svg" alt="dot-mr-small" className="absolute right-20 top-[52%] w-12 opacity-70 float-fast" />

      {/* 中央の目立つドットを削除し、代わりに多数の小ドットで密度を上げる */}
      <img src="/assets/decor/dot-blue.svg" alt="dot-1" className="absolute left-[20%] top-[18%] w-8 opacity-70 float-fast" />
      <img src="/assets/decor/dot-pink.svg" alt="dot-2" className="absolute left-[30%] top-[22%] w-10 opacity-72 float-fast" />
      <img src="/assets/decor/dot-yellow.svg" alt="dot-3" className="absolute left-[15%] top-[34%] w-6 opacity-60 float-slow" />
      <img src="/assets/decor/dot-blue.svg" alt="dot-4" className="absolute left-[42%] top-[28%] w-8 opacity-68 float-fast" />
      <img src="/assets/decor/dot-pink.svg" alt="dot-5" className="absolute right-[38%] top-[30%] w-7 opacity-66 float-slow" />
      <img src="/assets/decor/dot-yellow.svg" alt="dot-6" className="absolute right-[26%] top-[20%] w-9 opacity-74 float-medium" />
      <img src="/assets/decor/dot-blue.svg" alt="dot-7" className="absolute left-[10%] top-[60%] w-8 opacity-64 float-slow" />
      <img src="/assets/decor/dot-pink.svg" alt="dot-8" className="absolute left-[28%] top-[66%] w-7 opacity-63 float-slow" />
      <img src="/assets/decor/dot-yellow.svg" alt="dot-9" className="absolute right-[22%] top-[62%] w-10 opacity-70 float-medium" />
      <img src="/assets/decor/dot-blue.svg" alt="dot-10" className="absolute right-[12%] top-[70%] w-8 opacity-65 float-slow" />
      <img src="/assets/decor/dot-pink.svg" alt="dot-11" className="absolute left-[45%] top-[72%] w-6 opacity-60 float-fast" />
      <img src="/assets/decor/dot-yellow.svg" alt="dot-12" className="absolute left-[60%] top-[66%] w-7 opacity-62 float-fast" />

      {/* Bottom-left */}
      <img src="/assets/decor/dot-pink.svg" alt="dot-bl" className="absolute left-10 bottom-44 w-56 opacity-85 float-medium" />
      <img src="/assets/decor/dot-yellow.svg" alt="dot-bl-small" className="absolute left-28 bottom-28 w-18 opacity-72 float-fast" />

      {/* Bottom-right */}
      <img src="/assets/decor/dot-blue.svg" alt="dot-br" className="absolute right-12 bottom-36 w-48 opacity-85 float-medium" />

      {/* Waves: 散らして配置 */}
      <img src="/assets/decor/wave-B8C5C9.svg" alt="wave-top-left" className="absolute left-6 top-80 opacity-90 float-strong" style={{ width: 300, height: 'auto', transform: 'rotate(2deg)' }} />
      <img src="/assets/decor/wave-E5D4B8.svg" alt="wave-top-right" className="absolute right-12 top-120 opacity-82 float-strong" style={{ width: 280, height: 'auto', transform: 'rotate(-6deg)' }} />
      <img src="/assets/decor/wave-D4B5B0.svg" alt="wave-mid" className="absolute left-1/3 top-44% opacity-75 float-medium" style={{ width: 240, height: 'auto' }} />

      {/* Small accents (sparks) spread */}
      <img src="/assets/decor/sparkle.svg" alt="sparkle-tl" className="absolute left-40 top-48 w-6 opacity-85 float-medium" />
      <img src="/assets/decor/sparkle.svg" alt="sparkle-br" className="absolute right-40 bottom-60 w-8 opacity-80 float-slow" />
      <img src="/assets/decor/sparkle.svg" alt="sparkle-ml" className="absolute left-56 top-64 w-7 opacity-78 float-fast" />

      {/* 添付の模様を画面全体に散らす（インラインSVGで色を切り替え） */}
      {motifPositions.map((m, i) => (
        <svg
          key={`motif-${i}`}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={
            m.size >= 52
              ? 'bg-motif float-strong'
              : m.size >= 36
              ? 'bg-motif float-medium'
              : m.size >= 24
              ? 'bg-motif float-slow'
              : 'bg-motif float-fast'
          }
          style={{
            position: 'absolute',
            left: m.left,
            top: m.top,
            width: m.size,
            height: m.size,
            transform: 'translate(-50%, -50%)',
            opacity: m.opacity,
          }}
        >
          {/* 中央の丸 */}
          <circle cx="12" cy="12" r="3.2" fill={m.color} />
          {/* 四方の小丸 */}
          <circle cx="12" cy="4.5" r="2.2" fill={m.color} />
          <circle cx="12" cy="19.5" r="2.2" fill={m.color} />
          <circle cx="4.5" cy="12" r="2.2" fill={m.color} />
          <circle cx="19.5" cy="12" r="2.2" fill={m.color} />
        </svg>
      ))}

      {/* 中央付近の大きな丸を追加（ユーザー要望） */}
      <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[rgba(255,243,200,0.95)] blur-md opacity-90 float-strong" />
      <div className="absolute left-[58%] top-[46%] -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[rgba(255,238,180,0.9)] blur-sm opacity-88 float-strong" />
      <div className="absolute left-[42%] top-[52%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[rgba(255,246,210,0.85)] blur-sm opacity-82 float-medium" />

      {/* フォーム周辺装飾は背景においておく（中央に横並びのドットは削除） */}
      {/* 横並びの SVG を削除して、代わりに小ドットをランダム配置で増やす */}
      <img src="/assets/decor/input-wave-small.svg" alt="input-wave-bg" className="absolute left-[38%] top-[60%] -translate-x-1/2 w-44 opacity-76 pointer-events-none float-medium" style={{ height: 'auto', transform: 'rotate(-2deg)' }} />
      <img src="/assets/decor/input-sparkle.svg" alt="input-sparkle-bg" className="absolute left-[62%] top-[64%] w-6 opacity-88 pointer-events-none float-fast" style={{ height: 'auto' }} />

      {/* 横並びの代替: 小さなドットを個別に散らす（サイズと位置をバラバラに） */}
      <img src="/assets/decor/dot-blue.svg" alt="dot-a" className="absolute left-[46%] top-[50%] w-6 opacity-80 pointer-events-none float-fast" />
      <img src="/assets/decor/dot-pink.svg" alt="dot-b" className="absolute left-[52%] top-[49%] w-8 opacity-82 pointer-events-none float-fast" />
      <img src="/assets/decor/dot-yellow.svg" alt="dot-c" className="absolute left-[58%] top-[53%] w-5 opacity-75 pointer-events-none float-slow" />
      <img src="/assets/decor/dot-blue.svg" alt="dot-d" className="absolute left-[36%] top-[54%] w-7 opacity-78 pointer-events-none float-fast" />
      <img src="/assets/decor/dot-pink.svg" alt="dot-e" className="absolute left-[62%] top-[58%] w-6 opacity-72 pointer-events-none float-slow" />
      <img src="/assets/decor/dot-yellow.svg" alt="dot-f" className="absolute left-[28%] top-[48%] w-5 opacity-68 pointer-events-none float-fast" />
      <img src="/assets/decor/dot-blue.svg" alt="dot-g" className="absolute left-[70%] top-[46%] w-9 opacity-84 pointer-events-none float-medium" />

      {/* Soft circles (背景の柔らかい丸) — 位置も分散 */}
      <div className="absolute -left-40 -top-36 w-96 h-96 rounded-full bg-[rgba(247,240,230,0.95)] blur-md opacity-40 float-slow" />
      <div className="absolute right-16 -top-12 w-72 h-72 rounded-full bg-[rgba(236,225,216,0.9)] blur-md opacity-35 float-medium" />
      <div className="absolute left-6 top-56 w-44 h-44 rounded-full bg-[rgba(220,230,230,0.6)] blur-sm opacity-30 float-fast" />
      <div className="absolute right-[-8%] bottom-6 w-80 h-80 rounded-full bg-[rgba(241,234,226,0.9)] blur-md opacity-30 float-medium" />
    </div>
  )
}
