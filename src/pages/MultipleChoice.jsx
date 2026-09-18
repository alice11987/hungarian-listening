import { useState } from 'react'
import AudioPlayer from '../components/AudioPlayer'
import BackButton from '../components/BackButton'

export default function MultipleChoice({ items, onBack }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)

  const item = items[index]
  const correct = item.choices[0]

  function choose(choice) {
    if (selected) return
    setSelected(choice)
  }

  function next() {
    setIndex(i => (i + 1) % items.length)
    setSelected(null)
  }

  function colorFor(choice) {
    if (!selected) return 'bg-gray-800 border-gray-600 text-white'
    if (choice === correct) return 'bg-green-600 border-green-500 text-white'
    if (choice === selected) return 'bg-red-600 border-red-500 text-white'
    return 'bg-gray-800 border-gray-700 text-gray-500'
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-4">
        <BackButton onClick={onBack} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8 pb-8">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">选择题</p>
          <p className="text-gray-500 text-xs">{index + 1} / {items.length}</p>
        </div>

        <AudioPlayer src={item.audio} />

        <p className="text-gray-400 text-sm">选出正确的意思</p>

        <div className="w-full max-w-sm flex flex-col gap-3">
          {item.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => choose(choice)}
              className={`w-full py-4 px-5 rounded-xl border text-left text-base transition-colors ${colorFor(choice)}`}
            >
              {choice}
            </button>
          ))}
        </div>

        {selected && (
          <div className="w-full max-w-sm">
            <div className="bg-gray-800 rounded-xl p-4 mb-4 text-center">
              <p className="text-gray-300 font-medium text-lg">{item.hu}</p>
              <p className="text-gray-400 text-sm mt-1">{item.zh}</p>
            </div>
            <button
              onClick={next}
              className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold text-lg"
            >
              下一题 →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
