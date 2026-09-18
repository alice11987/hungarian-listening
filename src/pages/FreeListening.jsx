import { useRef, useState } from 'react'
import BackButton from '../components/BackButton'

export default function FreeListening({ items, onBack }) {
  const [index, setIndex] = useState(0)
  const [showTranscript, setShowTranscript] = useState(true)
  const [activeSentence, setActiveSentence] = useState(null)
  const audioRefs = useRef({})

  const passage = items[index]
  const sentences = passage.sentences

  function playSentence(sentenceId, audioSrc) {
    Object.values(audioRefs.current).forEach(a => { if (a) a.pause() })
    setActiveSentence(sentenceId)
    const audio = audioRefs.current[sentenceId]
    if (audio) {
      audio.currentTime = 0
      audio.play()
    }
  }

  function playAll() {
    setActiveSentence(sentences[0].id)
    playSequence(0)
  }

  function playSequence(i) {
    if (i >= sentences.length) { setActiveSentence(null); return }
    const s = sentences[i]
    setActiveSentence(s.id)
    const audio = audioRefs.current[s.id]
    if (audio) {
      audio.currentTime = 0
      audio.onended = () => playSequence(i + 1)
      audio.play()
    }
  }

  function stopAll() {
    Object.values(audioRefs.current).forEach(a => { if (a) { a.pause(); a.currentTime = 0 } })
    setActiveSentence(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-4">
        <BackButton onClick={onBack} />
      </div>

      <div className="flex-1 flex flex-col px-5 pb-8 gap-5">
        {/* Passage selector */}
        {items.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {items.map((p, i) => (
              <button
                key={p.id}
                onClick={() => { setIndex(i); stopAll() }}
                className={`shrink-0 px-3 py-1 rounded-full text-sm border ${
                  i === index ? 'bg-red-500 border-red-500 text-white' : 'border-gray-600 text-gray-400'
                }`}
              >
                {p.title_zh}
              </button>
            ))}
          </div>
        )}

        <div className="text-center">
          <h2 className="text-xl font-semibold">{passage.title}</h2>
          <p className="text-gray-400 text-sm">{passage.title_zh}</p>
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={playAll}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500 text-white font-semibold"
          >
            ▶ 全部播放
          </button>
          <button
            onClick={stopAll}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-600 text-gray-400"
          >
            ⏹ 停止
          </button>
          <button
            onClick={() => setShowTranscript(s => !s)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-600 text-gray-400 text-sm"
          >
            {showTranscript ? '隐藏文字' : '显示文字'}
          </button>
        </div>

        {/* Sentences */}
        <div className="flex flex-col gap-3">
          {sentences.map((s) => (
            <div key={s.id}>
              <audio
                ref={el => audioRefs.current[s.id] = el}
                src={s.audio}
              />
              <button
                onClick={() => playSentence(s.id, s.audio)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  activeSentence === s.id
                    ? 'bg-red-900/40 border-red-500/60'
                    : 'bg-gray-800 border-gray-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`mt-0.5 shrink-0 text-lg ${activeSentence === s.id ? 'text-red-400' : 'text-gray-500'}`}>
                    {activeSentence === s.id ? '▶' : '○'}
                  </span>
                  <div>
                    {showTranscript ? (
                      <>
                        <p className="text-white text-base leading-snug">{s.hu}</p>
                        <p className="text-gray-400 text-sm mt-1">{s.zh}</p>
                      </>
                    ) : (
                      <p className="text-gray-500 text-sm">点击播放这句话</p>
                    )}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
