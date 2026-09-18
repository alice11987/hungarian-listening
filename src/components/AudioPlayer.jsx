import { useEffect, useRef, useState } from 'react'

export default function AudioPlayer({ src, autoPlay = false, onEnded }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
    setPlaying(false)
    if (autoPlay && audioRef.current) {
      audioRef.current.play().catch(() => setError(true))
    }
  }, [src, autoPlay])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => setError(true))
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <audio
        ref={audioRef}
        src={src}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); onEnded?.() }}
        onError={() => setError(true)}
      />
      <button
        onClick={toggle}
        className="w-20 h-20 rounded-full bg-red-500 text-white text-4xl flex items-center justify-center shadow-lg active:scale-95 transition-transform"
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? '⏸' : '▶'}
      </button>
      {error && (
        <p className="text-xs text-gray-400 text-center">
          音频加载失败<br />
          <span className="text-gray-300">请先运行 generate_audio.py</span>
        </p>
      )}
    </div>
  )
}
