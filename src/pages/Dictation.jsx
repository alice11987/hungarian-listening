import { useState } from 'react'
import AudioPlayer from '../components/AudioPlayer'
import BackButton from '../components/BackButton'

function diffLetters(input, correct) {
  const result = []
  const maxLen = Math.max(input.length, correct.length)
  for (let i = 0; i < maxLen; i++) {
    const a = input[i] ?? ''
    const b = correct[i] ?? ''
    result.push({ char: b, correct: a.toLowerCase() === b.toLowerCase() })
  }
  return result
}

export default function Dictation({ items, onBack }) {
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const item = items[index]

  function submit() {
    if (!input.trim()) return
    setSubmitted(true)
  }

  function next() {
    setIndex(i => (i + 1) % items.length)
    setInput('')
    setSubmitted(false)
    setShowHint(false)
  }

  const diff = submitted ? diffLetters(input, item.hu) : []
  const isCorrect = submitted && input.trim().toLowerCase() === item.hu.toLowerCase()

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-4">
        <BackButton onClick={onBack} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8 pb-8">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">听写</p>
          <p className="text-gray-500 text-xs">{index + 1} / {items.length}</p>
        </div>

        <AudioPlayer src={item.audio} />

        <p className="text-gray-400 text-sm">听完后打出你听到的匈牙利语句子</p>

        {!submitted ? (
          <div className="w-full max-w-sm flex flex-col gap-4">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="在此输入..."
              className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-red-400"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
            />
            {showHint && (
              <p className="text-yellow-400 text-sm text-center">
                提示：{item.en} / {item.zh}
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowHint(h => !h)}
                className="flex-1 py-3 rounded-xl border border-gray-600 text-gray-400 text-sm"
              >
                {showHint ? '隐藏提示' : '显示提示'}
              </button>
              <button
                onClick={submit}
                disabled={!input.trim()}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold disabled:opacity-40"
              >
                提交
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-sm flex flex-col gap-4">
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-2">你的答案：</p>
              <p className="text-lg break-all">{input}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-2">正确答案：</p>
              <div className="flex flex-wrap text-lg gap-0.5">
                {diff.map((d, i) => (
                  <span key={i} className={d.correct ? 'text-green-400' : 'text-red-400'}>
                    {d.char}
                  </span>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-2">{item.en}</p>
              <p className="text-gray-500 text-sm">{item.zh}</p>
            </div>
            {isCorrect && (
              <p className="text-green-400 text-center text-lg">✓ 完全正确！</p>
            )}
            <button
              onClick={next}
              className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold text-lg"
            >
              下一句 →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
