import { useState } from 'react'
import AudioPlayer from '../components/AudioPlayer'
import BackButton from '../components/BackButton'

export default function Shadowing({ items, onBack }) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('listen') // listen | repeat | done
  const [showText, setShowText] = useState(false)

  const item = items[index]
  const isLast = index === items.length - 1

  function onAudioEnded() {
    setPhase('repeat')
  }

  function next() {
    if (isLast) {
      setPhase('done')
    } else {
      setIndex(i => i + 1)
      setPhase('listen')
      setShowText(false)
    }
  }

  function restart() {
    setIndex(0)
    setPhase('listen')
    setShowText(false)
  }

  if (phase === 'done') {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 gap-6">
        <p className="text-5xl">🎉</p>
        <p className="text-2xl font-semibold">完成了！</p>
        <p className="text-gray-400">你练习了 {items.length} 个句子</p>
        <button onClick={restart} className="py-3 px-8 rounded-xl bg-red-500 text-white font-semibold text-lg">
          再练一次
        </button>
        <button onClick={onBack} className="py-3 px-8 rounded-xl border border-gray-600 text-gray-400">
          返回主页
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-4">
        <BackButton onClick={onBack} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8 pb-8">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">跟读</p>
          <p className="text-gray-500 text-xs">{index + 1} / {items.length}</p>
        </div>

        {phase === 'listen' ? (
          <>
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm text-center">
              <p className="text-gray-400 text-sm mb-3">👂 先听</p>
              <p className="text-2xl font-medium text-white leading-relaxed">
                {showText ? item.hu : '???'}
              </p>
              {showText && <p className="text-gray-400 mt-2">{item.zh}</p>}
            </div>

            <AudioPlayer src={item.audio} onEnded={onAudioEnded} />

            <button
              onClick={() => setShowText(s => !s)}
              className="text-sm text-gray-400 underline"
            >
              {showText ? '隐藏文字' : '显示文字'}
            </button>
          </>
        ) : (
          <>
            <div className="bg-red-900/30 border border-red-500/40 rounded-2xl p-6 w-full max-w-sm text-center">
              <p className="text-red-300 text-sm mb-3">🗣 现在跟读</p>
              <p className="text-2xl font-medium text-white leading-relaxed">{item.hu}</p>
              <p className="text-gray-400 mt-2">{item.zh}</p>
            </div>

            <AudioPlayer src={item.audio} />

            <button
              onClick={next}
              className="w-full max-w-sm py-4 rounded-xl bg-red-500 text-white font-semibold text-xl"
            >
              {isLast ? '完成 ✓' : '继续 →'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
